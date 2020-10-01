import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Layout } from '../Layout';


function Enrollment(props) {
  const [enrollments, setEnrollments] = useState([]);
  const [newEnrollment, setnewEnrollment] = useState({
      client_id: "",
      course_name : "",
      institute : "",
      category : "",
      course_start_date : new Date(),
      successMessage: null,
      allEnrollments: null
  })
  const handleChange = (e) => {
      const {id , value} = e.target   
      setnewEnrollment(prevState => ({
          ...prevState,
          [id] : value
      }))
  }

  console.log('Enro', enrollments);

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload={
        "email":newEnrollment.email,
        "password":newEnrollment.password,
    }
    axios.post(API_BASE_URL+'/api/v1/login', payload)
    .then(function (response) {
        if(response.status === 200){
            setnewEnrollment(prevState => ({
                ...prevState,
                'successMessage' : 'Login successful. Redirecting to home page..'
            }))
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
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

  const redirectToHome = () => {
    props.history.push('/dashboard');
  }

  return(
    <Layout>
      <div>
        <Link to="/dashboard">Dashboard</Link>
        <h2>Add Enrollment</h2>
        <div>
          <input type="text" placeholder="client ID" id="client_id" value={newEnrollment.client_id} onChange={handleChange} />
        </div>
        <div>
          <select id="course_name" value={newEnrollment.course_name} onChange={handleChange}>
            <option value="bachelors-in-nursing">Bachelors in Nursing</option>
            <option value="bachelors-in-it">Bachelors in IT</option>
            <option value="masters-in-commerce">Masters in Commerce</option>
            <option value="masters-in-humanity">Masters in Humanity</option>
          </select>
        </div>
        <div>
          <select id="institute" value={newEnrollment.institute} onChange={handleChange}>
            <option value="murdoch-uni">Murdoch Uni</option>
            <option value="curtin-uni">Curtin Uni</option>
            <option value="uwa">UWA Uni</option>
            <option value="edith-cowan-uni">Edith Cowan Uni</option>
          </select>
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
                    <th>CID</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Assigned to:</th>
                </tr>
            </thead>
            <tbody>
                {enrollments.length ? enrollments.map((client, index) => (
                <tr key={index}>
                    <td>{client.condat_id}</td>
                    <td>{ `${client.first_name} ${client.middle_name} ${client.last_name}` }</td>
                    <td>{ client.phone }</td>
                    <td>{ client.email }</td>
                    <td>{ client.assigned_to }</td>
                </tr> )) :
                <tr>
                    <td colSpan="5">No Enrollments available</td>
                </tr> }
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  )
}

export default withRouter(Enrollment);
