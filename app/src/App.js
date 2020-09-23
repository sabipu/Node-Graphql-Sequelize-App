import React, {useState} from 'react';
import axios from 'axios';

function App(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        name: ""
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
      // if(state.email.length && state.password.length) {
      //     props.showError(null);
      //     const payload={
      //         "email":state.email,
      //         "password":state.password,
      //     }
      //     axios.post(API_BASE_URL+'/user/register', payload)
      //         .then(function (response) {
      //             if(response.status === 200){
      //                 setState(prevState => ({
      //                     ...prevState,
      //                     'successMessage' : 'Registration successful. Redirecting to home page..'
      //                 }))
      //                 localStorage.setItem(ACCESS_TOKEN_NAME,response.data.token);
      //                 redirectToHome();
      //                 props.showError(null)
      //             } else{
      //                 props.showError("Some error ocurred");
      //             }
      //         })
      //         .catch(function (error) {
      //             console.log(error);
      //         });    
      // } else {
      //     props.showError('Please enter valid username and password')    
      // }
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        console.log(state);
        if(state.password === state.confirmPassword) {
            sendDetailsToServer()    
        } else {
            throw new Error('Passwords do not match');
        }
    }
    return(
      <>
        <div>
          <input type="text" placeholder="name" id="name" value={state.name} onChange={handleChange} />
        </div>
        <div>
          <input type="text" placeholder="name" id="email" value={state.email} onChange={handleChange} />
        </div>
        <div>
          <input type="password" placeholder="name" id="password" value={state.password} onChange={handleChange} />
        </div>
        <input type="submit" onClick={handleSubmitClick} /> 
      </>
    )
}

export default App;
