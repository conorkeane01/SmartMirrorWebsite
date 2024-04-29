import React, { useContext } from 'react';
import GlobalContextData from '../../utils/store/globalContextData'; 
import SleepDataItem from './SleepDataItem'; 


export default function DataList() {
  const { userData } = useContext(GlobalContextData);

  if (!userData || userData.length === 0) {
    return <div>No sleep data available</div>;
  }

  return (
    <ul>
      {userData.map(item => (
        <SleepDataItem key={item._id} userData={item} />
      ))}
    </ul>
  );
}

