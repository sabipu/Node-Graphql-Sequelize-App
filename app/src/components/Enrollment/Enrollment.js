import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Layout } from '../Layout';


function Enrollment(props) {
  const [state , setState] = useState({
      client_id: "",
      course_name : "",
      institute : "",
      category : "",
      course_start_date : new Date(),
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
    <Layout>
      <div>
        <input type="text" placeholder="client ID" id="client_id" value={state.client_id} onChange={handleChange} />
      </div>
      <div>
        <select id="course_name" value={state.course_name} onChange={handleChange}>
          <option value="bachelors-in-nursing">Bachelors in Nursing</option>
          <option value="bachelors-in-it">Bachelors in IT</option>
          <option value="masters-in-commerce">Masters in Commerce</option>
          <option value="masters-in-humanity">Masters in Humanity</option>
        </select>
      </div>
      <div>
        <select id="institute" value={state.institute} onChange={handleChange}>
          <option value="murdoch-uni">Murdoch Uni</option>
          <option value="curtin-uni">Curtin Uni</option>
          <option value="uwa">UWA Uni</option>
          <option value="edith-cowan-uni">Edith Cowan Uni</option>
        </select>
      </div>
      <div>
        <select id="category" value={state.category} onChange={handleChange}>
          <option value="onshore">Onshore</option>
          <option value="offshore">Offshore</option>
        </select>
      </div>
      <div>
        <DatePicker id="course_start_date" selected={state.course_start_date} onChange={date => handleChange(date)} />
      </div>
      <input type="submit" onClick={handleSubmitClick} />
      <div>
      {state.successMessage}
      </div>
      <div className="enrollmentHolder">
        
      </div>
    </Layout>
  )
}

export default withRouter(Enrollment);
