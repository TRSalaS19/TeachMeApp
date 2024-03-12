import React, {useEffect, useState} from "react";
import axios from "axios";
import Navbar from "./Navbar";
import '../Styles/dog-breed-search.css'

export default function DogBreedSearchPage(){
    const [breedsData, setBreedsData] = useState(null);
    const [chosenBreed, setChosenBreed] = useState(null);
    const [chosenBreedData, setChosenBreedData] = useState(null);

    const breedApiKey = import.meta.env.VITE_DOG_BREED_API_KEY

    
   useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds`, {
                headers: {
                    'x-api-key': breedApiKey
                }
            })
            setBreedsData(response.data)
        } catch(error){
            console.error(error);
        }
    }
    
    getData();
   },[])

   const handleChange = (e) => {
        setChosenBreed(e.target.value)
   }

   const getBreedData = () => {
        breedsData.map((breed) => {
            if(breed.name === chosenBreed){
                setChosenBreedData(breed);
            }
        })
   }

    return(
        <div className="breed-search-container">
            <Navbar />
            <video autoPlay loop muted className="dog-background-video">
                <source 
                    src="https://res.cloudinary.com/imagesforapi/video/upload/v1710201601/mod_3_final/v0m9fgqdskemp48qxy4j.mp4"
                    type="video/mp4" 
                />
            </video>
            <section className="breed-content">
                <h1>Welcome</h1>
                <p>please choose an option below</p>
                <p>(for more info about a Canine Breed...)</p>
                <div className="input-group select-container">
                    <button className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#dogModal" type="button" onClick={getBreedData}>Get Info</button>
                    <select onChange={handleChange} className="form-select" id="inputGroupSelect01">
                        <option>Choose...</option>
                        {breedsData && (
                            breedsData.map((breed) => (
                                <option key={breed.id} value={breed.name}>{breed.name}</option>
                            ))
                        )}
                    </select>
                </div>
                {chosenBreedData && (
                    <div className="modal fade text-center dog-modal" id="dogModal" tabIndex="-1" aria-labelledby="dogModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className="modal-content dog-modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-1 text-center mx-auto text-uppercase" id="dogModalLabel">{chosenBreedData.name}</h1>
                                </div>
                                <div className="modal-body dog-modal-body">
                                    <img className='modal-img dog-modal-img' src={chosenBreedData.image.url} alt="" />
                                    {chosenBreedData.origin && (
                                        <p>Origin: <span>{chosenBreedData.origin}</span></p>
                                    )}
                                    {chosenBreed.bred_for && (
                                        <p>Bred for: <span>{chosenBreedData.bred_for}</span></p>
                                    )}
                                    <p>Breed Group: <span>{chosenBreedData.breed_group}</span></p>
                                    <p>Weight: <span>{chosenBreedData.weight.imperial} lbs.</span></p>
                                    <p>Height: <span>{chosenBreedData.height.imperial} inches</span></p>
                                    <p>Life Span: <span>{chosenBreedData.life_span} years</span></p>
                                    <p>Temperament: <span>{chosenBreedData.temperament}</span></p>
                                    <button type="button" className="btn-close text-center dog-btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </div>
    )
}