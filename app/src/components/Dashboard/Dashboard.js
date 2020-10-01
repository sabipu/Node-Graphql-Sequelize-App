import React,{ useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout } from "../Layout";

function Dashboard(props) {
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
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/client">Client</Link></li>
            <li><Link to="/institute">Institute</Link></li>
            <li><Link to="/enrollment">Enrollment</Link></li>
        </Layout>
    )
}

export default withRouter(Dashboard);