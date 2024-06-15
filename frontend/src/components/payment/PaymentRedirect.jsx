import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { createNotification } from '../../API/API';
import { useNavigate } from 'react-router-dom';

function PaymentRedirect() {
    const { auth } = useAuthContext();
    const navigate = useNavigate();

    async function deleteElement(id) {
        if(auth) {
            
          try {
              const response = await axios.delete(`http://localhost:5000/proposition/${id}`, {
                  headers: {
                      'Authorization': `Bearer ${auth.token}`
                  }
              });
              console.log('Element deleted successfully');
              return response.data;
          } catch (error) {
              console.error('Error deleting element:', error.response ? error.response.data : error.message);
              throw error;
          }
    
        }
    }
    
    useEffect(() => {
        const prop = JSON.parse(localStorage.getItem('payto'));
        if(auth?.user?.role ==="Admin" && !prop) {
            navigate('/dashboard');
        } else {

    
            const createCurrentProject = async () => {
                if (prop) {
                    const { announcementId, freelancer } = prop;
    
                    try {
                        const response = await axios.post(
                            `http://localhost:5000/projects/${freelancer._id}`, 
                            {
                                announcement: announcementId._id
                            }, 
                            {
                                headers: {
                                    'Authorization': `Bearer ${auth.token}`,
                                }
                            }
                        );
                        
                        console.log("Current project created successfully", response.data);
                        const { currentProject } = response.data;
                        createNotification(
                            currentProject.freelancer,
                            currentProject._id,
                            "acceptence",
                            auth.user.name,
                            auth.token,
                            "accepted you in the project you applied"
                        );
    
                        
                        navigate('/profile');
    
                        deleteElement(prop._id);
                        localStorage.removeItem("payto");
                        
                    } catch (error) {
                        console.error("Error creating current project", error.response ? error.response.data : error.message);
                    }
                }
            };
    
            if (prop && auth && auth.token) {
                createCurrentProject();
            } else {
                console.log("Missing prop or auth data");
            }
        }
    }, [auth, navigate]);

    return (
        <div className="df">
            <div className="redirect"></div>
            redirecting ...
        </div>
    );
}

export default PaymentRedirect;
