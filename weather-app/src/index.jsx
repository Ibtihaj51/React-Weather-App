import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import axios from "axios";
const API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';
let num1 = 0;

function Hi() {


  const [data, setData] = useState(0);
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { // get current weather 
      axios.get(`https://api.openweathermap.org/data/2.5/onecall?
      &exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div>


   
 <center><h1>
     Weather App
    </h1> 

   <form onSubmit={submitHandler}>

      <input
        type="text"
        placeholder='City Name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <button type="submit">Get Weather</button>

    </form> </center>

    <br />

    {(weather?.name)?

      <div>
        <div>Weather of {weather?.name}</div>
        <div>Current Temp {weather?.main?.temp}</div>
      </div>
      :
      null
    }

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));