// Dependencies
import React, {useEffect, useState} from "react";
import axios from "axios";
// Components
import Navbar from "./Navbar";
import CountryInfoModal from "./CountryInfoModal";
import NewsModal from "./NewsModal";
// Styles
import '../Styles/country-search.css';

export default function CountrySearch(){

    const [userInput, setUserInput] = useState('');
    const [countries, setCountries] = useState([]);
    const [countryData, setCountryData] = useState(null);
    const [countryNewsData, setCountryNewsData] = useState(null);
    const [partialNewsList, setPartialNewsList] = useState(null);

    const countryAPI = import.meta.env.VITE_COUNTRY_API;
    

    // get all countries from api
    useEffect(() => {
        const getCountryData = async() => {
            try{
                const response = await axios.get(`https://restcountries.com/v3.1/all`)
                setCountries(response.data)
            } catch(error){
                console.error("Error getting Country Data", error);
            }
        }

        getCountryData();
    }, [userInput])

    // handle user input change
    const handleChange = (e) => {
        setUserInput(e.target.value)
    }

    // get info of country user typed in the user select field

    const getCountryData = () => {
        countries.map(country => {
            if(country.name.common.toLowerCase() === userInput.toLocaleLowerCase()){
                setCountryData(country);
                getNewsData();
            }
        })
    }

    // Get News info depending on selected country from user select field
    

    const getNewsData = async() => {
        try{
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: userInput,
                    pageSize: 100,
                    language: 'en',
                    apiKey: countryAPI
                }
            })
            setCountryNewsData(response.data.articles);
            const articles = response.data.articles.slice(0, 20);
            setPartialNewsList(articles)
            console.log(countryNewsData);
        } catch (error){
            console.error(`error fetch country news datat: ${error}`);
        }
    }


    return (
        <div className="country-search-container">
            <Navbar />
            {/* background video */}
            <video autoPlay loop muted className="country-background-video">
                <source 
                src="https://res.cloudinary.com/imagesforapi/video/upload/v1710201608/mod_3_final/ngesvm8aoxhf45hawkbu.mp4"
                type="video/mp4" 
                />
            </video>
            <section className="card text-center country-card bg-transparent no-border">
                <div className="card-body">
                    <h5>Search For Country Info And Latest National News</h5>
                    <p>(Type County name below to get Country facts and news...)</p>
                    <div className="input-group mb-3">
                        <select onChange={handleChange} className="form-select country-select" id="inputGroupSelect01">
                        <option >Choose a Country...</option>
                        {countries && (
                            countries.map((country) => (
                                <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                            ))
                        )}
                    </select>
                        <button 
                            className="btn get-fact-btn" 
                            type='button' 
                            // id='button-addon1'
                            data-bs-toggle='modal' 
                            data-bs-target='#countryModal' 
                            onClick={getCountryData} >
                                {countryData ? "Country Facts" : "Get News & Facts"}
                            {/* Country Facts */}
                        </button>
                        {countryData && (
                            <button
                                className="btn get-news-btn"
                                type="button"
                                // id='button-addon1'
                                data-bs-toggle='modal'
                                data-bs-target='#newsModal'
                                // onClick={getNewsData}
                                >
                                    News Data
                                </button>
                        )}
                    </div>
                </div>
                {countryData && (
                    <CountryInfoModal country={countryData} />
                )}
                {countryNewsData && countryData && (
                    <NewsModal newsData={partialNewsList} countryData={countryData} setCountryData={setCountryData}/>
                )}
            </section>
        </div>
    )
}