import React,{ useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout } from "../Layout";
import { Enrollment } from "../Enrollment";

function Client(props) {
    // useEffect(() => {
    //   axios.get(API_BASE_URL+'/user/me', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
    //   .then(function (response) {
    //       if(response.status !== 200){
    //         redirectToLogin()
    //       }
    //   })
    //   .catch(function (error) {
    //     redirectToLogin()
    //   });
    // })

    // function redirectToLogin() {
    //   props.history.push('/login');
    // }

    return(
        <Layout>
          <div>Client</div>
        </Layout>
    )
}

export default withRouter(Client);