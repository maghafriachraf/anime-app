import React, { useState, useEffect}  from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import Footer from "./Footer"


function Details({favories, updateFav,details}){
        
        const [title,setTitle]= useState('');
        const [descrip,setDescrip]= useState('');
        const [poster,setPoster]= useState('');
        const [cover,setCover]= useState('');
        const [rang,setRang]= useState('');
        const currentAnimeAdded = favories.find((el) => el.id === details)//true if the current anime is already added to fav
        
const getDetails = () => {
console.log();
    axios
    .get(`https://kitsu.io/api/edge/anime/${details}`)
    .then((response) => {
                        setTitle(response.data.data.attributes.titles.en_jp);
                        setDescrip(response.data.data.attributes.description);
                        setPoster(response.data.data.attributes.posterImage.original);
                        setCover((response.data.data.attributes.coverImage.original));
                        setRang(response.data.data.attributes.ratingRank)})
    .catch((err) => console.log(err))
    
} 



  useEffect(() => {
    getDetails();
  },)
  
     
    
    return(
        <div className="container" >
            
            <div  className="cover_anime"> 
                <img className="cover-img" src={cover} alt="Anime cover"></img>
            </div>

            <div  className="poster_anime"> 
            <img className="poster-img" src={poster} alt="Anime poster"></img>
            </div>

            <div className="infos">
            <div className="top-infos" >
            <span className="title">{title}</span>
            <span className="rang"> <i className="uil uil-trophy icon"></i>  Rang {rang}</span>
            </div>
            
            {currentAnimeAdded ? (
              
                <button className="btn removefav" onClick={() => updateFav(favories.filter(el => el.id !== details))}>
                  Retirer des favoris <i className="uis uis-favorite icon"></i>
                </button>
            
             ) : (
              
              <button className="btn addfav" onClick={() => updateFav([...favories, {id : details, poster : poster}])}>
               Ajouter aux favoris <i className="uil uil-favorite icon"></i>
              </button>
              
            )}   
            
            <div className="description">{descrip}</div>
            </div>

              
                <Link className="btn gobackDetails" to={`/`} >
                <div >
                  <i className="uil uil-corner-up-left-alt icon"></i> Retourner au catalogue
                  </div>
                  </Link> 
              

              
                  <Footer></Footer>
             
              
            
            

            
     

     
        </div>
        
    );
}

export default Details