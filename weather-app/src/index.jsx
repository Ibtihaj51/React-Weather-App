import "./index.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { useState, useEffect } from "react";
import axios from "axios";
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
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
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


   
 <center><h1 className='heading'>
     Weather App
    </h1> 

   <form onSubmit={submitHandler}>

      <input className='inbx'
        type="text"
        placeholder='City Name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <button className='go' type="submit">Get Weather</button>

    </form> </center>

    <br />

    {(weather?.name)?

     <center> <div>
        <div className='result'>Weather of  {weather?.name}</div>
        <br></br>
        <div className='result'>Current Temp {weather?.main?.temp}</div>
        <br></br>
        <div className='result'>Max Temp {weather?.main?.temp_max}</div>
        <br></br>
        <div className='result'>Min Temp {weather?.main?.temp_min}</div>
        <br></br>
        <div className='result'>Humidity {weather?.main?.humidity}</div>
        <br></br>
        <div className='result'>Wind Speed {weather?.wind?.speed}</div>
      </div></center>
      :
      null
    }

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));