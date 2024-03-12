import React, {useState} from "react";
import '../Styles/news-modal.css';

export default function NewsModal({newsData, countryData, setCountryData}){

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    }

    const handleNewsClose = () => {
        setCountryData(null)
    }


    return (
        <div className="modal fade" id="newsModal" tabIndex="-1" aria-labelledby="newsModal" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-xl news-modal-container">
                <div className="modal-content news-modal-content">
                    <div className="modal-header news-modal-header">
                        <h1 className="modal-title fs-1" id="newsModal">News Articles for {countryData.name.common}</h1>
                    </div>
                    <div className="modal-body d-flex flex-wrap justify-content-center">
                        {newsData.map((article, index) => (
                                <div key={index} className="card news-modal-card my-1 mx-1" style={{ width: "45%" }}>
                                    {article.urlToImage &&(
                                        <img src={article.urlToImage} className="card-img-top" alt="..." />
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{article.title}</h5>
                                        {article.description && (
                                            <p className="card-text">{article.description}</p>
                                        )}
                                        <p className="card-text">Published: {formatDate(article.publishedAt)}</p>
                                        <p className="card-text">Source: {article.source.name}</p>
                                        <a href={article.url} className="btn btn-primary news-viewStory-btn">View Story</a>
                                    </div>
                                </div>
                        ))}
                    </div>
                <div className="modal-footer d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary news-close-btn" data-bs-dismiss="modal" onClick={handleNewsClose}>Close</button>
                </div>
                </div>
            </div>
        </div>
    )
}