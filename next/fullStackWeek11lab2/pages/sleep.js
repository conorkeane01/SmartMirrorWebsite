import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import DataList from "../components/notes/DataList";
import DataItem from "../components/notes/DataItem";
import {
  SleepDataChart,
  SleepDataChartMouth,
} from "../components/notes/SleepDataCharts";
import styles from "../components/notes/SleepDataCharts.module.css";

function Sleep() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Attempting to fetch data...");
        const response = await fetch("/api/get-data");  //
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); 
  
        if (data && data.userData) {  
          setUserData(data.userData);
  
          const totalOpenTime = data.userData.reduce((acc, item) => {  //check to see if the user has spent more time with their mouth open
            return item.mouth_status === 'Open' ? acc + item.time_spent : acc;
          }, 0);
      
          const totalClosedTime = data.userData.reduce((acc, item) => {
            return item.mouth_status === 'Closed' ? acc + item.time_spent : acc; //or if their mouth is closed
          }, 0);
      
          if (totalOpenTime > totalClosedTime) { //if the mouth is open longer than it has been closed calls the warning function
            setShowWarning(true); 
          } else {
            setShowWarning(false); 
          }
        } else {
          console.error("Data fetched doesn't have the expected format", data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchData();
  }, []);

  return (
    <Layout>
      <div className={styles.sleep}>
        <div className={styles.chartContainer}>
          <h1 style={{ textAlign: "center" }}>Sleep Data</h1>
          <div className={styles.chartWrapper}>
            <SleepDataChart userData={userData} />
          </div>
          <div className={styles.chartWrapper}>
            <SleepDataChartMouth userData={userData} />
          </div>
          {showWarning && (
        <div className={styles.warning}>
          <p>Warning: Sleeping with your mouth open can have negative health impacts, affect sleep, cause snoring, and sleep apnea</p>
        </div>
      )}
        </div>
      </div>
    </Layout>
  );
}

export default Sleep;


