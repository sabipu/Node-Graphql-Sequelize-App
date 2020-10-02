import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Layout } from '../Layout';


function Enrollment(props) {
  const [clients, setClients] = useState([]);
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [newEnrollment, setnewEnrollment] = useState({
      client_id: "",
      courseId : "",
      universityId : "",
      course_category : "",
      course_start_date : new Date(),
      successMessage: null
  })
  const handleChange = (e) => {
      const {id , value} = e.target   
      setnewEnrollment(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
      "clientId": newEnrollment.clientId,
      "courseId": newEnrollment.courseId,
      "universityId": newEnrollment.universityId,
      "course_category": newEnrollment.course_category,
      "course_start_date": newEnrollment.course_start_date
    }

    axios.post(API_BASE_URL+'/api/v1/createNewEnrollment', payload)
    .then(function (response) {
        if(response.status === 200){
            setnewEnrollment(prevState => ({
                ...prevState,
                'successMessage' : 'Login successful. Redirecting to home page..'
            }))
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            // redirectToHome();
        }
        else if(response.code === 204){
          setnewEnrollment(prevState => ({
            ...prevState,
            'successMessage' : 'Username and password do not match'
          }))
        }
        else{
          setnewEnrollment(prevState => ({
            ...prevState,
            'successMessage' : 'Username does not exists'
          }))
        }
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  useEffect(() => {
    axios.get(API_BASE_URL+'/api/v1/getAllClients', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    .then(function (response) {
        if(response.status !== 200){
          // redirectToLogin()
        } else {
          console.log(response)
          setClients(response.data.clients)
        }
    })
    .catch(function (error) {
      // redirectToLogin()
    });

    axios.get(API_BASE_URL+'/api/v1/getAllEnrollment', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    .then(function (response) {
        if(response.status !== 200){
          // redirectToLogin()
        } else {
          console.log(response)
          setEnrollments(response.data.enrollments)
        }
    })
    .catch(function (error) {
      // redirectToLogin()
    });

    axios.get(API_BASE_URL+'/api/v1/getAllCourses', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    .then(function (response) {
        if(response.status !== 200){
          // redirectToLogin()
        } else {
          console.log(response)
          setCourses(response.data.courses)
        }
    })
    .catch(function (error) {
      // redirectToLogin()
    });
  }, [newEnrollment]);

  const redirectToHome = () => {
    props.history.push('/dashboard');
  }

  return(
    <Layout>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <h2>Add Enrollment</h2>
        <div>        
          {clients.length && 
            <select id="client_id" value={newEnrollment.client_id} onChange={handleChange}>
              { clients.map((client, index) => ( <option key={index} value={client.condat_id}>{client.first_name }</option> )) }
            </select>
          }
        </div>
        <div>
          {courses.length && 
            <select id="course_name" value={newEnrollment.course_name} onChange={handleChange}>
              { courses.map((course, index) => ( <option key={index} data-id={course.id}>{course.course_name }</option> )) }
            </select>
          }
        </div>
        <div>
          <select id="category" value={newEnrollment.category} onChange={handleChange}>
            <option value="onshore">Onshore</option>
            <option value="offshore">Offshore</option>
          </select>
        </div>
        <div>
          <DatePicker id="course_start_date" selected={newEnrollment.course_start_date} onChange={date => handleChange(date)} />
        </div>
        <input type="submit" onClick={handleSubmitClick} />
        <div>
        {newEnrollment.successMessage}
        </div>
        <div>
          <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Client name</th>
                    <th>Course Name</th>
                    <th>Category</th>
                    <th>Start Date</th>
                    <th>App submission date</th>
                    <th>Offer letter date</th>
                    <th>Offer letter acceptance date</th>
                    <th>GTE assessment date</th>
                    <th>ECOE date</th>
                    <th>Visa lodge date</th>
                    <th>Bonus Amount</th>
                </tr>
            </thead>
            <tbody>
                {enrollments.length ? enrollments.map((enrollment, index) => (
                <tr key={index}>
                    <td>{enrollment.index}</td>
                    <td>{ enrollment.client_name }</td>
                    <td>{ enrollment.course_name }</td>
                    <td>{ enrollment.course_category }</td>
                    <td>{ enrollment.course_start_date }</td>
                    <td>{ enrollment.application_submission_date }</td>
                    <td>{ enrollment.offer_letter_date }</td>
                    <td>{ enrollment.offer_accpetance_date }</td>
                    <td>{ enrollment.gte_assessment_date }</td>
                    <td>{ enrollment.ecoe_date }</td>
                    <td>{ enrollment.visa_application_lodge_date }</td>
                    <td>{ enrollment.bonus_amount }</td>
                </tr> )) :
                <tr>
                    <td colSpan="12">No Enrollments available</td>
                </tr> }
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(Enrollment);
