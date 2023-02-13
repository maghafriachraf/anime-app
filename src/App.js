import Table from "./components/Table";
import Details from "./components/Details";
import Favories from "./components/Favories";
import Banner from "./components/Banner";
import "./App.css";
import axios from 'axios';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState, useEffect}  from "react";




function App(){

  const details_stored =localStorage.getItem('details');
  
  const favories_stored = JSON.parse(localStorage.getItem('favories'));
  const [details,setDetails]= useState(details_stored ? details_stored : "");
  const [favories,updateFav] = useState(favories_stored ? favories_stored : [])
  const [initialData,setinitialData]= useState([]);

  const getData = () => {
    axios
    .get('https://kitsu.io/api/edge/anime')
    .then((response) => setinitialData(response.data.data))
    .catch((err) => console.log(err))
  }

  useEffect(() => {
    getData()   
  }, []) 

  useEffect(() => {
    localStorage.setItem('details', details)
  },[details])

  useEffect(() => {
    localStorage.setItem('favories', JSON.stringify(favories))
  },[favories])


  
  return (
    <div>
      <Banner></Banner>  
    
    <Router>
      
                   
      <Routes>
        <Route exact path={"/"} element={<Table initialData={initialData} setDetails={setDetails} />} />
        <Route path={"/details"} element={<Details details={details} updateFav={updateFav} favories={favories} />} />
        <Route path={"/favoris"} element={<Favories setDetails={setDetails} favories={favories} />} />


        </Routes>
    </Router>

    </div>
  );
}

export default App;