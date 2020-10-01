import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";

import { Layout } from "../Layout";

function Institute(props) {
    const [institutes, setInstitutes] = useState([]);
    const [course , setCourse] = useState({
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
        setCourse(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
  
    const handleSubmitClick = (e) => {
      e.preventDefault();
      const payload = {
          sessionId: localStorage.getItem(ACCESS_TOKEN_NAME),
          course_name: course.course_name,
          institute_name: course.institute_name,
          institute_code: course.institute_code,
          institute_email: course.institute_email,
          institute_phone: course.institute_phone,
          course_duration: course.course_duration,
          application_processing_days: course.application_processing_days,
          onshore_bonus_amount: course.onshore_bonus_amount,
          offshore_bonus_amount: course.offshore_bonus_amount
      }

      axios.post(API_BASE_URL+'/api/v1/createNewCourse', payload)
      .then(function (response) {
          if(response.status === 200){
              setCourse(prevState => ({
                  ...prevState,
                  'successMessage' : 'Course Created Successfullly'
              }))
          }
          else if(response.code === 403){
            setCourse(prevState => ({
              ...prevState,
              'successMessage' : 'User not found'
            }))
          }
          else{
            setCourse(prevState => ({
              ...prevState,
              'successMessage' : 'Not logged in'
            }))
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    useEffect(() => {
      axios.get(API_BASE_URL+'/api/v1/getAllCourses', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
      .then(function (response) {
          if(response.status !== 200){
            // redirectToLogin()
          } else {
            setInstitutes(response.data.courses)
          }
      })
      .catch(function (error) {
        // redirectToLogin()
      });
    }, [course, props]);

    function redirectToLogin() {
      props.history.push('/login');
    }

    return(
        <Layout>
            <div className="form__wrapper">
                <Link to="/dashboard">Dashboard</Link>
                <h2>Add Course</h2>
                <div>
                    <input type="text" placeholder="Course Name" id="course_name" value={course.course_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Institute Name" id="institute_name" value={course.institute_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Institute Code" id="institute_code" value={course.institute_code} onChange={handleChange} />
                </div>
                <div>
                    <input type="email" placeholder="Email" id="institute_email" value={course.institute_email} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Phone" id="institute_phone" value={course.institute_phone} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Duration" id="course_duration" value={course.course_duration} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Application Processing days" id="application_processing_days" value={course.application_processing_days} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Onshore Bonus Amount" id="onshore_bonus_amount" value={course.onshore_bonus_amount} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Offshore Bonus Amount" id="offshore_bonus_amount" value={course.offshore_bonus_amount} onChange={handleChange} />
                </div>
                <input type="submit" onClick={handleSubmitClick} />
                <div>
                {course.successMessage}
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Course name</th>
                                <th>Course duration (months)</th>
                                <th>Processing days</th>
                                <th>Onshore bonus</th>
                                <th>Offshore bonus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {institutes.length ? institutes.map((course, index) => (
                            <tr key={index}>
                                <td>{course.course_name}</td>
                                <td>{ course.course_duration }</td>
                                <td>{ course.application_processing_days }</td>
                                <td>{ course.onshore_bonus_amount }</td>
                                <td>{ course.offshore_bonus_amount }</td>
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