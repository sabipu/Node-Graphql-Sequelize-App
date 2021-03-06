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
      condat_id: "",
      course_id : "",
      course_category : "",
      course_start_date : new Date(),
      successMessage: null
  })
  const handleChange = (e) => {
      const { id , value } = e.target   
      setnewEnrollment(prevState => ({
        ...prevState,
        [id] : value
    }))
  }

  const handleDateChange = (date, e) => { 
    setnewEnrollment(prevState => ({
        ...prevState,
        course_start_date : date
    }))
}

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      sessionId: localStorage.getItem(ACCESS_TOKEN_NAME),
      condat_id: newEnrollment.condat_id,
      course_id: newEnrollment.course_id,
      course_category: newEnrollment.course_category,
      course_start_date: newEnrollment.course_start_date
    }

    axios.post(API_BASE_URL+'/api/v1/createNewEnrollment', payload)
    .then(function (response) {
        if(response.status === 200){
            setnewEnrollment(prevState => ({
                ...prevState,
                'successMessage' : 'Enrollment added successfully'
            }))
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


    console.log(newEnrollment);

    axios.get(API_BASE_URL+'/api/v1/getAllClients', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    .then(function (response) {
        if(response.status !== 200){
          // redirectToLogin()
        } else {
          setClients(response.data.clients)
        }
    })
    .catch(function (error) {
      // redirectToLogin()
    });

    axios.get(API_BASE_URL+'/api/v1/getAllEnrollments', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    .then(function (response) {
        if(response.status !== 200){
          // redirectToLogin()
        } else {
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
            <select id="condat_id" value={newEnrollment.condat_id} onChange={handleChange}>
              <option value="">Select</option>
              { clients.map((client, index) => ( <option key={index} value={client.condat_id}>{client.first_name }</option> )) }
            </select>
          }
        </div>
        <div>
          {courses.length && 
            <select id="course_id" value={newEnrollment.course_id} onChange={handleChange}>
              <option value="">Select</option>
              { courses.map((course, index) => ( <option key={index} value={course.id}>{course.course_name }</option> )) }
            </select>
          }
        </div>
        <div>
          <select id="course_category" value={newEnrollment.course_category} onChange={handleChange}>
            <option value="">Select</option>
            <option value="onshore">Onshore</option>
            <option value="offshore">Offshore</option>
          </select>
        </div>
        <div>
          <DatePicker selected={newEnrollment.course_start_date} onChange={(date ,e) => handleDateChange(date, e)} />
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
