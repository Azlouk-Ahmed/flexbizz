import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useFetchData = (API) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { auth } = useAuthContext();
  
    useEffect(() => {
      const fetchData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API, {
                headers: {
                    'Authorization': `Bearer ${auth.token}`
                }
            });
            setData(response.data);
            setLoading(false);
            setError(false);
        } catch (error) {
            console.error('Error data:', error);
            setLoading(false);
            if(error?.response?.data.error) {
              setError(error.response.data.error)
            }
            setError(error.message);
        }
      };
      if (auth) {
        fetchData();
      }
    }, [auth, API]);

    return {data,loading,error}
}