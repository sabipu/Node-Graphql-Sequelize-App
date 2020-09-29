import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        first_name : "",
        last_name : "",
        company_name : "",
        company_username : "",
        email : "",
        password : "",
        confirmPassword: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const sendDetailsToServer = () => {
      if(state.email.length && state.password.length) {
          const payload = {
            "first_name":state.first_name,
            "last_name":state.last_name,
            "company_name":state.company_name,
            "company_username":state.company_username,
            "email":state.email,
            "password":state.password
          }

          axios.post(API_BASE_URL+'/api/v1/createNewCompany', payload)
              .then(function (response) {
                  if(response.status === 200){
                      setState(prevState => ({
                          ...prevState,
                          'successMessage' : 'Registration successful. Redirecting to home page..'
                      }))
                      localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
                      redirectToHome();
                  } else{
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Some error occured'
                    }))
                  }
              })
              .catch(function (error) {
                console.log(error)
              });    
      } else {
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Please enter valid username and password'
          }))
      }
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer();
    }

    const redirectToHome = () => {
      props.history.push('/dashboard');
    }

    return(
      <div className="form__wrapper">
        <h2>Register</h2>
        <div>
          <input type="text" placeholder="First name" id="first_name" value={state.first_name} onChange={handleChange} />
        </div>
        <div>
          <input type="text" placeholder="Last name" id="last_name" value={state.last_name} onChange={handleChange} />
        </div>
        <div>
          <input type="text" placeholder="Company name" id="company_name" value={state.company_name} onChange={handleChange} />
        </div>
        <div>
          <input type="text" placeholder="Company Username" id="company_username" value={state.company_username} onChange={handleChange} />
        </div>
        <div>
          <input type="email" placeholder="Email" id="email" value={state.email} onChange={handleChange} />
        </div>
        <div>
          <input type="password" placeholder="password" id="password" value={state.password} onChange={handleChange} />
        </div>
        <input type="submit" onClick={handleSubmitClick} /> 
        <div>
        {state.successMessage}
        </div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </div>
    )
}

export default withRouter(RegistrationForm);
