import React, { useState } from "react";
import axios from "axios";
import styles from "./Weather.module.css"; // Import the module.css file as a module
import Layout from "../components/layout/Layout"

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url =
    ``;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      setLocation('')
    }
  };
  return (
    <Layout>
    <div className={styles.index}> {/* Use the generated class name from the module.css file */}
      <div className={styles.weather}> {/* Use the generated class name from the module.css file */}
      <div className={styles.search}> {/* Use the generated class name from the module.css file */}
            <input 
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder="Enter Location"
            type = "text/"/>
            
        </div>
        <div className={styles.container}> {/* Use the generated class name from the module.css file */}
          <div className={styles.top}> {/* Use the generated class name from the module.css file */}
            <div className={styles.location}> {/* Use the generated class name from the module.css file */}
              <p>{data.name}</p>
            </div>
            <div className={styles.temp}> {/* Use the generated class name from the module.css file */}
                {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
            </div>
            <div className={styles.description}> {/* Use the generated class name from the module.css file */}
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>

          {data.name != undefined && 
          <div className={styles.bottom}> {/* Use the generated class name from the module.css file */}
          <div className={styles.feels}> {/* Use the generated class name from the module.css file */}
              {data.main ? <p className={styles.bold}>{data.main.feels_like.toFixed()} ºC</p> : null}
            <p>Feels Like </p>
          </div>
          <div className={styles.humidity}> {/* Use the generated class name from the module.css file */}
              {data.main ? <p className={styles.bold}>{data.main.humidity} %</p> : null}
            <p>Humidity</p>
          </div>
          <div className={styles.wind}> {/* Use the generated class name from the module.css file */}
          {data.wind ? <p className={styles.bold}>{data.wind.speed} MPH</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
          }
          
        </div>
      </div>
    </div>
    </Layout>
  );
  
}

export default Weather;