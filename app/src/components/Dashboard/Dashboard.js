import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';

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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                        <th>5</th>
                        <th>6</th>
                        <th>7</th>
                        <th>8</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default withRouter(Dashboard);