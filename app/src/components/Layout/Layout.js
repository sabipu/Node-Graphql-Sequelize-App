import React,{ useEffect } from 'react';

import { Sidebar } from "../Sidebar";

const Layout = ({ children }) => {
    return(
        <div className="wrapper">
          <Sidebar />
          <div className="mainContent">
            header
            {children}
          </div>
        </div>
    )
}

export default Layout;