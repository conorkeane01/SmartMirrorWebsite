import React from 'react';
import Card from '../ui/Card'; // Adjust the import path as necessary

function SleepDataItem({ userData }) {
    return (
        <li>
          <Card>
            <div>
              <p>Time Spent: {userData.time_spent}</p>
              <p>Sleep Direction: {userData.sleep_direction}</p>
              <p>Mouth Status: {userData.mouth_status}</p>  
            </div>
          </Card>
        </li>
  );
}

export default SleepDataItem;

