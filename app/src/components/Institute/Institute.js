import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";

import { Layout } from "../Layout";

function Institute(props) {
    const [state , setState] = useState({
        course_name: "",
        institute_name : "",
        institute_code : "",
        institute_email : "",
        institute_phone : "",
        course_duration : "",
        application_processing_days : "",
        onshore_bonus_amount : "",
        offshore_bonus_amount : "",
        successMessage: null,
        allCourses: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
  
    const handleSubmitClick = (e) => {
      e.preventDefault();
      const payload = {
          sessionId: localStorage.getItem(ACCESS_TOKEN_NAME),
          course_name: state.course_name,
          institute_name: state.institute_name,
          institute_code: state.institute_code,
          institute_email: state.institute_email,
          institute_phone: state.institute_phone,
          course_duration: state.course_duration,
          application_processing_days: state.application_processing_daysphone,
          onshore_bonus_amount: state.onshore_bonus_amount,
          offshore_bonus_amount: state.offshore_bonus_amount
      }
      
      axios.post(API_BASE_URL+'/api/v1/createNewCourse', payload)
      .then(function (response) {
          if(response.status === 200){
              setState(prevState => ({
                  ...prevState,
                  'successMessage' : 'Course Created Successfullly'
              }))
          }
          else if(response.code === 403){
            setState(prevState => ({
              ...prevState,
              'successMessage' : 'User not found'
            }))
          }
          else{
            setState(prevState => ({
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
    //   axios.get(API_BASE_URL+'/api/v1/getAllClients', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    //   .then(function (response) {
    //       if(response.status !== 200){
    //         // redirectToLogin()
    //       } else {
    //           setState(prevState => ({
    //             ...prevState,
    //             allClients : response.data.clients
    //           }))
    //       }
    //   })
    //   .catch(function (error) {
    //     // redirectToLogin()
    //   });
    })

    function redirectToLogin() {
      props.history.push('/login');
    }

    return(
        <Layout>
            <div className="form__wrapper">
                <Link to="/dashboard">Dashboard</Link>
                <h2>Add Course</h2>
                <div>
                    <input type="text" placeholder="Course Name" id="course_name" value={state.course_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Institute Name" id="institute_name" value={state.institute_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Institute Code" id="institute_code" value={state.institute_code} onChange={handleChange} />
                </div>
                <div>
                    <input type="email" placeholder="Email" id="institute_email" value={state.institute_email} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Phone" id="institute_phone" value={state.institute_phone} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Duration" id="course_duration" value={state.course_duration} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Application Processing days" id="application_processing_days" value={state.application_processing_days} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Onshore Bonus Amount" id="onshore_bonus_amount" value={state.onshore_bonus_amount} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Offshore Bonus Amount" id="offshore_bonus_amount" value={state.offshore_bonus_amount} onChange={handleChange} />
                </div>
                <input type="submit" onClick={handleSubmitClick} />
                <div>
                {state.successMessage}
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
                            {state.allClients ? state.allClients.map((client, index) => (
                            <tr key={index}>
                                <td>Condat ID: {client.condat_id}</td>
                                <td>Name: { `${client.first_name} ${client.middle_name} ${client.last_name}` }</td>
                                <td>Phone: { client.phone }</td>
                                <td>Email: { client.email }</td>
                                <td>Assigned to: { client.assigned_to }</td>
                            </tr> )) :
                            <tr>
                                <td colSpan="5">No Courses available</td>
                            </tr> }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Institute);