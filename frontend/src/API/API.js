import axios from "axios";

const postRequest = async (url, requestData, authToken) => {
    try {
        const response = await axios.post(url, requestData, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
            }
        });
        return { data: response.data, error: null };
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
            return { data: null, error: error.response.data.message };
        } else {
            return { data: null, error: error.message };
        }
    }
};

export const createNotification = async (
    receiverId,
    elementId,
    notificationType,
    username,
    token,
    message
  ) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        process.env.REACT_APP_API_URL+"/notification",
        {
          receiverId,
          elementId,
          notificationType,
          username,
          message
        },
        config
      );

      console.log("Notification created successfully:", response.data);
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  export const createApplyRequest = async (id,token) =>  {

    try {
        const config = {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.post(
            process.env.REACT_APP_API_URL+"/proposition/"+id,
            {},
            config
        );

        console.log("apply request created successfully:", response.data);
        } catch (error) {
        console.error("Error creating apply:", error);
        }
    }

export default postRequest;
