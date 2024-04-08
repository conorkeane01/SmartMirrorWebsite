import React, { useState, useEffect } from 'react';
import NoteItem from './notes/DataItem';

function DataList() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await fetch('/api/getData', {
        method: 'POST',
        body: JSON.stringify({ cmd: 'all' }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setUserData(data.userData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <ul>
      {userData.map(userData => (
        <NoteItem key={userData._id} userData={userData} />
      ))}
    </ul>
  );
}

export default DataList;
