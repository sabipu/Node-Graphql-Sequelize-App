import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiCotants';
import { Link, withRouter } from "react-router-dom";

import { Layout } from "../Layout";

function Client(props) {
    const [clients, setClients] = useState([]);
    const [clientData , setClientData] = useState({
        condat_id: "",
        first_name : "",
        middle_name : "",
        last_name : "",
        last_name : "",
        email : "",
        phone : "",
        assigned_to : "",
        description : "",
        successMessage: null,
        allClients: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setClientData(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
  
    const handleSubmitClick = (e) => {
      e.preventDefault();
      const payload = {
          sessionId: localStorage.getItem(ACCESS_TOKEN_NAME),
          condat_id: clientData.condat_id,
          first_name: clientData.first_name,
          middle_name: clientData.middle_name,
          last_name: clientData.last_name,
          email: clientData.email,
          phone: clientData.phone,
          assigned_to: clientData.assigned_to
      }
      axios.post(API_BASE_URL+'/api/v1/createNewClient', payload)
      .then(function (response) {
          if(response.status === 200){
              setClientData(prevState => ({
                  ...prevState,
                  'successMessage' : 'Client Created Successfullly'
              }))
          }
          else if(response.code === 403){
            setClientData(prevState => ({
              ...prevState,
              'successMessage' : 'User not found'
            }))
          }
          else{
            setClientData(prevState => ({
              ...prevState,
              'successMessage' : 'Username does not exists'
            }))
          }
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    useEffect(() => {
      axios.get(API_BASE_URL+'/api/v1/getAllClients', { headers: { 'token': localStorage.getItem(ACCESS_TOKEN_NAME) }})
      .then(function (response) {
          if(response.status !== 200){
            // redirectToLogin()
          } else {
              setClients(response.data.clients);
          }
      })
      .catch(function (error) {
        // redirectToLogin()
      });
    }, [clientData]);

    function redirectToLogin() {
      props.history.push('/login');
    }

    return(
        <Layout>
            <div className="form__wrapper">
                <Link to="/dashboard">Dashboard</Link>
                <h2>Add Client</h2>
                <div>
                    <input type="text" placeholder="Condat ID" id="condat_id" value={clientData.condat_id} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="First Name" id="first_name" value={clientData.first_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Middle Name" id="middle_name" value={clientData.middle_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Last Name" id="last_name" value={clientData.last_name} onChange={handleChange} />
                </div>
                <div>
                    <input type="email" placeholder="Email" id="email" value={clientData.email} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" placeholder="Phone" id="phone" value={clientData.phone} onChange={handleChange} />
                </div>
                <div>
                    <label>Assign to</label>
                    <select id="assigned_to" value={clientData.assigned_to} onChange={handleChange}>
                    <option value="user1">User 1</option>
                    <option value="user2">User 2</option>
                    <option value="user3">User 3</option>
                    </select>
                </div>
                <div>
                    <textarea type="text" placeholder="Description" id="description" value={clientData.description} onChange={handleChange} />
                </div>
                <input type="submit" onClick={handleSubmitClick} />
                <div>
                {clientData.successMessage}
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>CID</th>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Email</th>
                                <th>Assigned to:</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.length ? clients.map((client, index) => (
                            <tr key={index}>
                                <td>{client.condat_id}</td>
                                <td>{ `${client.first_name} ${client.middle_name} ${client.last_name}` }</td>
                                <td>{ client.phone }</td>
                                <td>{ client.email }</td>
                                <td>{ client.assigned_to }</td>
                            </tr> )) :
                            <tr>
                                <td colSpan="5">No Clients available</td>
                            </tr> }
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    )
}

export default withRouter(Client);