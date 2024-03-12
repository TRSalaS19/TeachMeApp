import React, {useState} from "react";
import GoogleMap from "./GoogleMaps";
import '../Styles/country-info-modal.css'

export default function CountryInfoModal({country}){
    return (
        <div className="modal fade text-center country-modal" id="countryModal" tabIndex="-1" aria-labelledby="countryModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content country-modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-2 mx-auto text-uppercase" id="countryModalLabel">{country.name.common}</h1>
                    </div>
                    <div className="modal-body country-modal-body">
                        <section className="names">
                            <h4>Names</h4>
                            <p>Common Name: <span>{country.name.common}</span></p>
                            <p>Offical Name: <span>{country.name.official}</span></p>
                        </section>
                        <section className="unMember">
                            <p>UN Member: <span>{country.unMember ? "Yes" : "No"}</span></p>
                        </section>
                        <section className="flags">
                            <h4>National Flag: </h4>
                            <img src={country.flags.png} alt="" />
                            <h4>Coat of Arms: </h4>
                            <img src={country.coatOfArms.png} alt="" className="coa-img"/>
                        </section>
                        <section className="currency">
                            <h4 className="currency-title">Currency</h4>
                            {Object.entries(country.currencies).map(([currencyCode, currencyInfo]) => (
                                <ul key={currencyCode} className="currecny-container">
                                    <li key={currencyCode} className="currency-item">
                                        <p className="currency-name beginning">Name: <span>{currencyInfo.name}</span></p>
                                        <p className="currency-symbol beginning">Symbol: <span>{currencyInfo.symbol}</span></p>
                                    </li>
                                </ul>
                            ))}  
                        </section>
                        <section className="languages">
                            <h4>Languages</h4>
                            <ul className="lang-container">
                                {Object.entries(country.languages).map(([key, value]) => (
                                    <li key={key} className="lang-item">
                                        <strong className="beginning">{value}</strong> 
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="borders">
                            <h4>Borders-Continents-Subregions</h4>
                            <p>Contenient:</p>
                            <ul>
                                {country.continents.map(continent => (
                                    <li key={country.id}>{continent}</li>
                                ))}
                            </ul>
                            <p>Subregion: <span>{country.subregion}</span></p>
                            <p>Border Countries</p>
                            <ul className="border-container">
                                {country.borders ? (
                                    country.borders.map(border => (
                                        <li className="border-item" key={border}>{border}</li>
                                    ))
                                ) : (
                                    <li className="border-item" >No Bordering Countries</li>
                                )}
                            </ul>
                            <GoogleMap className='map' mapKey={`${country.latlng[0]}-${country.latlng[1]}`} lat={country.latlng[0]} long={country.latlng[1]}/>
                        </section>
                        <button type="button" className="btn-close text-center country-close-btn" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </div>
    )
}