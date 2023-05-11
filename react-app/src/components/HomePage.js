import axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "./base_url";
import Header from "./Header";


function HomePage() {
    const navigate = useNavigate();
    let [locationList, setLocationList] = useState([]);
   
    
    let getLocationList = async() => {
        let url = `${BASE_URL}get-location-list`;
        let { data } = await axios.get(url);
        if (data.status === true) {
            setLocationList([...data.result]);
        } else {
            setLocationList([]);
        }   
    };

    
    useEffect(() => {
        getLocationList();
      
    },[]);
       
    return (
      <main className="zomato-home">
      <div className="header-image justify-content: center">
           <img src="..\Images\shutterstock-img.png" 
                width="100%" 
                height="609px" 
                alt=""/>
      </div>
      <div>
        <Header/>
      </div>
          <div className="logo" onClick={() => {navigate('/menu')}}>
              <p className="header-logo bg-light text-center fw-bold text-danger">
               e!  
              </p>
          </div>
          <div className="head"> 
              <h1 className="text text-center text-light pt-4">
                Find the best restaurants, cafés, and bars
              </h1>
          </div>
          <div className="search-select-box text-center mt-5 pb-4 ">
                  
                  <select className=" text-secondary text-center" id="search">
                      <option>Please type a location</option>
                      {locationList.map((location, index) => {
                        return (
                            <option key={index} value={location.location_id}>
                                {location.Location}, {location.city}
                            </option>
                        );
                     })}
                  </select>
            <input className="search text-center text-secondary ms-3 mt-4 border-0" 
                   type="text" 
                   placeholder="Search for restaurants" 
                   id="restaurants" 
                   list="searchlocation"/>
             <i className="fa-solid fa-magnifying-glass text-secondary fs-5 position-relative" 
                id="search-icon"></i>
          </div>
  </main>
    );
  }
  
  export default HomePage;
  






 