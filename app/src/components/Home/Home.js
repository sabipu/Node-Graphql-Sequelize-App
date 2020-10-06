import React,{ useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

function Home(props) {
    return(
        <div>
            Home page content 11
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default withRouter(Home);