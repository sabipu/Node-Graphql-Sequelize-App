import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";

function Enrollment(props) {
  const [state , setState] = useState({
      client_id: "",
      course_name : "",
      institute : "",
      category : "",
      course_start_date : "",
      successMessage: null
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
    const payload={
        "email":state.email,
        "password":state.password,
    }
    axios.post(API_BASE_URL+'/api/v1/login', payload)
    .then(function (response) {
        if(response.status === 200){
            setState(prevState => ({
                ...prevState,
                'successMessage' : 'Login successful. Redirecting to home page..'
            }))
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
        }
        else if(response.code === 204){
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Username and password do not match'
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

  const redirectToHome = () => {
    props.history.push('/dashboard');
  }

  return(
    <>

      <div>
        <input type="text" placeholder="client ID" id="client_id" value={state.client_id} onChange={handleChange} />
      </div>
      <div>
        <input type="text" placeholder="Course name" id="course_name" value={state.course_name} onChange={handleChange} />
      </div>
      <div>
        <input type="text" placeholder="Institute" id="institute" value={state.institute} onChange={handleChange} />
      </div>
      <div>
        <input type="text" placeholder="Category" id="category" value={state.category} onChange={handleChange} />
      </div>
      <div>
        <input type="text" placeholder="Course Start Date" id="course_name" value={state.course_start_date} onChange={handleChange} />
      </div>
      <input type="submit" onClick={handleSubmitClick} />
      <div>
      {state.successMessage}
      </div>
    </>
  )
}

export default withRouter(Enrollment);
