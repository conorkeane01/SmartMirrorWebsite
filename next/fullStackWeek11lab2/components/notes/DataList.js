import React, { useContext } from 'react';
import GlobalContextData from '../../pages/store/globalContextData'; // Adjust the import path
import SleepDataItem from './SleepDataItem'; // This is a new or adjusted component


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
