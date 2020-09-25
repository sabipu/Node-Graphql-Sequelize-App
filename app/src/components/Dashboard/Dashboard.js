import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Enrollment } from "../Enrollment"

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
        <div>
            <Enrollment />
        </div>
    )
}

export default withRouter(Dashboard);