import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const usePostData = (API,data) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { auth } = useAuthContext();
    const postData = async (data) => {
        setLoading(true);
        try {
            const response = await axios.post(API, data, {
                headers: {
                    'authorization': `Bearer ${auth.token}`
                }
            });
            setData(response.data);
            setError(false);
            setLoading(false);
        } catch (error) {
            setError(error)
        }
    }
    if(auth) {
        postData(data);
    }
    return {data,loading,error}
}