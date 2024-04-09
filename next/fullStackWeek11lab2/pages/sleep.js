import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import DataList from "../components/notes/DataList";
import DataItem from "../components/notes/DataItem";
import SleepDataChart from "../components/notes/SleepDataCharts";
import styles from "../components/notes/SleepDataCharts.module.css";

function Sleep() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Attempting to fetch data...");
        const backendUrl = 'http://34.239.36.76:8000';
        const response = await fetch("/api/get-data");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Check the structure of fetched data

        // Adjust according to your actual data structure. Here, we expect { userData: [] }
        if (data && data.userData) {
          setUserData(data.userData);
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
      <div className={styles.chartContainer}>
        <h1>Sleep Data</h1>
        {loading ? (
          <p>Loading...</p>
        ) : userData && userData.length > 0 ? (
          <SleepDataChart userData={userData} />
        ) : (
          <p>No sleep data available.</p> // Handle case where data is empty or unavailable
        )}
      </div>
    </Layout>
  );
}

export default Sleep;
