import React, {useState} from "react";
import axios from "axios";
import Navbar from "./Navbar";
import '../Styles/news-page.css';

export default function NewsListPage() {

    const [userInquiry, setUserInquiry] = useState("");
    const [newsData, setNewsdata] = useState(null);

    const newsapi = import.meta.env.VITE_NEWS_API;

    const handleChange = (e) => {
        setUserInquiry(e.target.value);
        console.log(userInquiry);
    }

    const clearNews = () => {
        setNewsdata(null);
    }

    const getNewsdata = async()=> {
        try {
            const response = await axios.get('https://newsapi.org/v2/everything', {
                params: {
                    q: userInquiry,
                    pageSize: 50,
                    language: 'en',
                    apiKey: newsapi,
                }
            })
            setNewsdata(response.data.articles)
        } catch(error) {
            console.error(`Error fetching News Data: ${error}`);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    return (
        <div className="container-fluid news-container">
                <Navbar />
                <video autoPlay loop muted className="news-background-video">
                    <source 
                    src="https://res.cloudinary.com/imagesforapi/video/upload/v1710201597/mod_3_final/qkmfqw2hdnhxtnwlomxe.mp4"
                    type="video/mp4" 
                    />
                </video>
                    <h3>Search for news:</h3>
                <div className="input-group mb-3 my-2 input-group-container">
                    <button className="btn btn-secondary" type="button" id="button-addon1" onClick={getNewsdata}>Get News</button>
                    <button className="btn btn-primary" type="button" id="button-addon1" onClick={clearNews}>Reset</button>
                    <input type="text" className="form-control" onChange={handleChange} placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                </div>

            {newsData && (
                <div className="row row-cols-1 row-cols-md-5 g-4">
                {newsData.map(article => (
                        <div className="col">
                            <div className="card h-100 text-center">
                                <img src={article.urlToImage} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    <p className="card-text">{article.description}</p>
                                    <a href={article.url} className="btn read-story-btn border-primary">Read Full Story...</a>
                                </div>
                                <div className="card-footer">
                                    <p className="card-text"> Author: {article.author}</p>
                                    <small className="text-body-secondary">Published: {formatDate(article.publishedAt)} </small>
                                    <small className="text-body-secondary">Source: {article.source.name}</small>
                                </div>
                            </div>
                        </div>
                ))}
                    </div>
            )}
        </div>
    )
}