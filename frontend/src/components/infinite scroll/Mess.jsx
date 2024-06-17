import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

function Mess() {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const limit = 3;

  const fetchMessages = async () => {
    if (error) return; 
    setError(null);

    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQyNjc1ZGMzZGZlYWY0MmQ4NDM0Y2IiLCJpYXQiOjE3MDg5NTI2NDUsImV4cCI6MTc0MDQ4ODY0NX0.uhdaM7rwc5uWpho--dNwyisKAoIMdtALAuDB8DsD0DA'; // Replace with your token
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/message/infinite/65d27370745513700d75792f?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.messages.length === 0) {
        setHasMore(false);
      } else {
        setMessages((prevMessages) => [...prevMessages, ...response.data.messages]);
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchMessages}
      hasMore={hasMore}
      loader={<div class="laading"></div>}
      endMessage={<p>No more messages to load</p>}
      scrollThreshold={0.9}
    >
      {messages.map((message, index) => (
        <div style={{ height: "10rem", backgroundColor: "#eee" }} key={index}>
          {message.text}
        </div>
      ))}
      {error && <p>Error fetching messages</p>}
    </InfiniteScroll>
  );
}

export default Mess;
