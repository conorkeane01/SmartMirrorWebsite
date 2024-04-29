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
  const [loading, setLoading] = useState(true); // Added loading state
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Attempting to fetch data...");
        const response = await fetch("/api/get-data");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Check the structure of fetched data
  
        if (data && data.userData) {
          setUserData(data.userData);
  
          // Calculate total times after setting userData
          const totalOpenTime = data.userData.reduce((acc, item) => {
            return item.mouth_status === 'Open' ? acc + item.time_spent : acc;
          }, 0);
      
          const totalClosedTime = data.userData.reduce((acc, item) => {
            return item.mouth_status === 'Closed' ? acc + item.time_spent : acc;
          }, 0);
      
          if (totalOpenTime > totalClosedTime) {
            setShowWarning(true); // Show warning if more time is spent with mouth open
          } else {
            setShowWarning(false); // Otherwise, do not show the warning
          }
        } else {
          console.error("Data fetched doesn't have the expected format", data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of fetch outcome
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


