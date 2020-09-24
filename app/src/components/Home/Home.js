import React,{ useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

function Home(props) {
    return(
        <div>
            Home page content
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
        </div>
    )
}

export default withRouter(Home);