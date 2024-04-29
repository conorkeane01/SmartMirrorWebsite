import React, { useState, useRef} from "react";
import axios from "axios";
import styles from "./Weather.module.css"; 
import Layout from "../components/layout/Layout"
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keyboard = useRef(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=36ac2beb2006541e5b2e59bfaf95e9a2`;

  const searchLocation = () => {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data);
    });
    setLocation('');
    setKeyboardOpen(false); // Close keyboard after search
  };

  const onChangeInput = (input) => {
    setLocation(input);
    if (keyboard.current) {
      keyboard.current.setInput(input);
    }
  };

  const handleFocus = () => {
    setKeyboardOpen(true);
    if (keyboard.current) {
      keyboard.current.setInput(location);
    }
  };

  const handleKeyPress = (button) => {
    console.log("Button pressed:", button);  // Logging any key press to console
    if (button === "{enter}") {  //if user presses enter 
      searchLocation(); //call function
    }
  };

  return (
    <Layout>
      <div className={styles.index}>
        <div className={styles.weather}>
          <div className={styles.search}>
            <input
              value={location}
              onChange={(e) => onChangeInput(e.target.value)}
              onFocus={handleFocus}
              onKeyPress={(e) => e.key === 'Enter' && searchLocation()}
              placeholder="Enter Location"
              type="text"
            />
            <div className={styles.hgButton}>
            {keyboardOpen && (
              <Keyboard
                keyboardRef={r => (keyboard.current = r)}
                onChange={onChangeInput}
                onKeyPress={handleKeyPress}
                buttonTheme={[
                  {
                    class: "hg-standard-btn",
                    buttons: "a b c d e f g h i j k l m n o p q r s t u v w x y z",
                    style: { backgroundColor: 'white', color: 'black', opacity: 1 } 
                  }
                ]}
                theme="simple-keyboard hg-theme-default hg-layout-default myTheme"
              />
            )}
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.top}>
              <div className={styles.location}>
                <p>{data.name}</p>
              </div>
              <div className={styles.temp}>
                {data.main ? <h1>{data.main.temp.toFixed()}ºC</h1> : null}
              </div>
              <div className={styles.description}>
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name && (
              <div className={styles.bottom}>
                <div className={styles.feels}>
                  {data.main ? <p className={styles.bold}>{data.main.feels_like.toFixed()}ºC</p> : null}
                  <p>Feels Like</p>
                </div>
                <div className={styles.humidity}>
                  {data.main ? <p className={styles.bold}>{data.main.humidity}%</p> : null}
                  <p>Humidity</p>
                </div>
                <div className={styles.wind}>  
                  {data.wind ? <p className={styles.bold}>{data.wind.speed} MPH</p> : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Weather;
