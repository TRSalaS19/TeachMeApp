import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Components/HomePage';
import DogBreedSearchPage from './Components/DogBreedSearch';
import CountrySearch from './Components/CountrySearch';
import NewsPage from './Components/NewsPage';
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/dogBreedSearchPage' element={<DogBreedSearchPage/>} />
        <Route path='/countrysearch' element={<CountrySearch />} />
        <Route path='/newsPage' element={<NewsPage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
