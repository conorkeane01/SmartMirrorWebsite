import React, { useState, useRef } from "react";
import axios from "axios";
import styles from "./Weather.module.css";
import Layout from "../components/layout/Layout";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const keyboard = useRef();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=YOUR_API_KEY`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
      setKeyboardOpen(false); // Close keyboard after search
    }
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setLocation(input);
    keyboard.current.setInput(input);
  };

  return (
    <Layout>
      <div className={styles.index}>
        <div className={styles.weather}>
          <div className={styles.search}>
            <input
              value={location}
              onChange={onChangeInput}
              onFocus={() => setKeyboardOpen(true)} // Open keyboard on input focus
              onBlur={() => setKeyboardOpen(false)} // Optional: Close keyboard when input loses focus
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
            />
            {keyboardOpen && (
              <Keyboard
                keyboardRef={(r) => (keyboard.current = r)}
                onChange={(input) => setLocation(input)}
                onKeyPress={(button) => button === "enter" && searchLocation({ key: 'Enter' })}
              />
            )}
          </div>
          {/* Your existing code to display weather data */}
        </div>
      </div>
    </Layout>
  );
}

export default Weather;