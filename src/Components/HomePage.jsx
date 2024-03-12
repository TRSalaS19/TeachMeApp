// React Import dependencies //
import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// Components 
import Navbar from "./Navbar";
// Styles //
import '../Styles/homePage.css';


export default function HomePage() {
    const [userLocationData, setUserLocationData] = useState(null);

    useEffect(() => {
        const getUserLocation = () => {
            if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const {latitude, longitude} = position.coords;
                        fetchWeatherData({lat: latitude, lon: longitude});
                    },
                    (error) => {
                        console.error(`Error getting user location: ${error}`);
                    }
                )
            }
        }

        const fetchWeatherData = async(params) => {
            const API_KEY = '56a8d644060016fb838bfeaab7a41e22';
            const apiURL = 'https://api.openweathermap.org/data/2.5/weather';
    
            try{
                const response = await axios.get(apiURL, {
                    params: {
                        appid: API_KEY,
                        units: 'imperial',
                        ...params
                    }
                })
                setUserLocationData(response.data)
            } catch(error){
                console.error('Error fetching weather Data: ', error);
            }
        }
        getUserLocation();
    }, [])

    return (
        <div className="home-container">
            <Navbar />
            <video autoPlay loop muted className="home-background-video">
                <source 
                    src="https://res.cloudinary.com/imagesforapi/video/upload/v1710201598/mod_3_final/iqtgefgrshj1gea5beep.mp4" 
                    type="video/mp4" 
                />
            </video>
            {userLocationData && (
                <div className="card bg-transparent weather-container" style={{maxWidth: "30%"}}>
                    <div className="card-header bg-transparent weather-temp-name">
                        <h5>{userLocationData.name}</h5>
                        <p>{Math.round(userLocationData.main.temp)}&#8457;</p>
                    </div>
                    <div className="card-body weather-min-max">
                            <p className='card-text'>Max: {Math.round(userLocationData.main.temp_max)}&#8457;</p>
                            <p className='card-text'>Min: {Math.round(userLocationData.main.temp_min)}&#8457;</p>
                    </div>
                    <div className="card-footer bg-transparent weather-conditions">
                        {userLocationData.weather.map(weatherCondition => (
                            <p className='card-text text-uppercase' key={weatherCondition.id}>{weatherCondition.description}</p>
                        ))}
                    </div>
                </div>
            )}
            <div className="home-content-container p-4">
                <h1>Welcome to TeachMe</h1>
                <p>Find info on These Topics...</p>
                <ul className="nav-link-container text-center">
                    <li><Link to='/dogBreedSearchpage' className="home-link">Search Dog Breeds</Link></li>
                    <li><Link className="home-link" to='/countrysearch'>Search Country Info & News</Link></li>
                    <li><Link className="home-link" to='/newsPage'>Search News Topics</Link></li>
                </ul>
            </div>
        </div>
    )
}