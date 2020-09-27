import React, {useState} from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        first_name: "",
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
          const payload= {
            "first_name":state.first_name,
            "email":state.email,
            "password":state.password,
          }
          axios.post(API_BASE_URL+'/api/v1/createNewUser', payload)
              .then(function (response) {
                  if(response.status === 200){
                      setState(prevState => ({
                          ...prevState,
                          'successMessage' : 'Registration successful. Redirecting to home page..'
                      }))
                      localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
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
        console.log(state);
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
          setState(prevState => ({
            ...prevState,
            'successMessage' : 'Passwords do not match'
          }))
        }
    }

    const redirectToHome = () => {
      props.history.push('/dashboard');
    }

    return(
      <>
        <div>
          <input type="text" placeholder="First name" id="first_name" value={state.first_name} onChange={handleChange} />
        </div>
        <div>
          <input type="text" placeholder="email" id="email" value={state.email} onChange={handleChange} />
        </div>
        <div>
          <input type="password" placeholder="password" id="password" value={state.password} onChange={handleChange} />
        </div>
        <div>
          <input type="password" placeholder="confirm password" id="confirmPassword" value={state.confirmPassword} onChange={handleChange} />
        </div>
        <input type="submit" onClick={handleSubmitClick} /> 
        <div>
        {state.successMessage}
        </div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </>
    )
}

export default withRouter(RegistrationForm);
