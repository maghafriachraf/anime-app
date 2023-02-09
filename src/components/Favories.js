import React  from "react";
import { Link } from "react-router-dom";


function Favories({favories,setDetails}){

return( 
    <div className='container'>
          <div className="topFav">
              

              <Link className="btn gobackFav" to={`/`} >
                <div >
                  <i className="uil uil-corner-up-left-alt icon"></i> Retourner au catalogue
                  </div>
                  </Link> 

              <div className="top">
                Favoris
              </div>
          </div>
          <ul  className='fav-list'>
          
              {favories.map((x,i) => (
                <Link key={`item-${i}`} className="fav-item" to={`/details`} onClick={() => setDetails(x.id)}>
                  <div>
                      <img className="fav-poster" src={x.poster} alt="item poster"></img>
                  </div>
                </Link> 
                
              )
            )} 

 
          </ul>

    </div>
  
);

}
export default Favories