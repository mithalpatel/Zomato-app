import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "./base_url";
import Header from "./Header";

function SearchPage() {
    const navigate = useNavigate();
    const {id, type} = useParams();
    let [filter, setFilter] = useState({meal_type:id, page: 1,});
    let [restList, setRestList] = useState([]);
    let [locationList, setLocationList] = useState([]);
    let [city, setCity] = useState('Near By');
    let [pageCount, setPageCount] = useState(0);
    let [page, setPage] = useState(1);

    
    let getLocationList = async() => {
      let url = `${BASE_URL}get-location-list`;
      let { data } = await axios.get(url);
      if (data.status === true) {
          setLocationList([...data.result]);
      } else {
          setLocationList([]);
      }   
  };

  let getFilterData = async () => {
    let url = `${BASE_URL}filter`;
      let { data } = await axios.post(url, filter);
      console.log(data);
      if (data.status === true) {
        setRestList([...data.result]);
        setPageCount(data.pageCount);
        setPage(data.page - 1);
      } else {
          setRestList([]);
          pageCount(0);
          setPage(0)

      }   
   };
   
   let setFilterLogic =(event, type, page) => {
    let { value } = event.target;
    switch (type) {
      case "page":
        setFilter({...filter, page: page});
        break;
      case "sort":
        setFilter({ ...filter, sort: value });
      break;
        case "cost" :
        let cost = value.split("-");
        setFilter['lcost'] = cost[0];
        setFilter['hcost'] = cost[1];
        setFilter({...filter, cost: value});
      break;
      case "cuisines" :
       setFilter({...filter, cuisines: value});
    break;
      case "location":
        if (value === "") {
          delete filter.location;
          setFilter({...filter }); //if no location is found we will get all the result
        }
        setFilter({ ...filter, location: value });
        break;
    }
   };
  
    

    //mounting
    useEffect(() => {
        getLocationList();
    },[]);
    
    //mounting & update of filter
    useEffect(() => {
      getFilterData(filter);
      if(filter.location) {
       let location = locationList.find((value) => {
          return Number (filter.location) === Number(value.location_id);
        });
        if(location) {
          setCity(location.city);
        } else {
          setCity('Near By');
        }
      } else{
        setCity('Near By');
      }
     },[filter]);

     

    return(
        <main className="container-fluid">
        <div className="bg-danger">
         <p className="e-logo text-center ms-3 brand fw-bold h3" 
            onClick={()=> navigate('/menu')}  >  e!  </p>
           <Header/>
        </div>
        
        <section className="row" >
          <section className="col-11 col-lg-11 m-auto pb-4">
              <h3 className="fw-bold mb-lg-5 places">{type} Places in {city}</h3>
              
              <section className="col-12 d-flex flex-wrap px-lg-5 px-md-5 pt-4">
            <aside className="food-shadow col-12 col-lg-3 col-md-4 me-5 p-3 mb-4 shadow">
              <div className="d-flex justify-content-between">
                <p className="fw-bolder fltr m-0">Filter</p>
                <button
                  className="d-lg-none d-md-none btn"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-controls="collapseFilter">
                  <span className="fa fa-eye"></span>
                </button>
              </div>
              
              <div className="collapse show" id="collapseFilter">
                <div>
                  <label className="form-label fw-bold">Select Location</label>
                  <select className="form-select form-select-sm"
                          name="location" 
                          onChange={(event) => setFilterLogic(event, "location")}
                          value="" >
                    <option>Select Location</option>
                    {locationList.map((location, index) => {
                        return(
                          <option key={index}
                                  value={location.location_id}>
                                    {location.Location}, {location.city}
                          </option>
                        );
                    })}
                  </select>
                </div>
                      <div className="mb-3 ms-1">
                          <label htmlFor="" 
                                 className="form-label">Cuisine</label>
                          <div className="form-check">
                          <input type="checkbox" 
                                 className="form-check-input"
                                 value="1"
                                 onChange={(event) => setFilterLogic(event, "cuisines")}
                                 />
                          <label htmlFor="" 
                                 className="form-check-label">North Indian</label>
                          </div>
                          <div className="form-check">
                          <input type="checkbox" 
                                 className="form-check-input" 
                                 value="2"
                                 onChange={(event) => setFilterLogic(event, "cuisines")}
                                />
                          <label htmlFor="" 
                                 className="form-check-label" >South Indian</label>
                          </div>
                          <div className="form-check">
                          <input type="checkbox" 
                                 className="form-check-input"
                                 value="3"
                                 onChange={(event) => setFilterLogic(event, "cuisines")}
                                 />
                          <label htmlFor="" 
                                 className="form-check-label" >Chinese</label>
                          </div>
                          <div className="form-check">
                          <input type="checkbox" 
                                 className="form-check-input"
                                 value="4"
                                 onChange={(event) => setFilterLogic(event, "cuisines")}
                                 />
                          <label htmlFor="" 
                                 className="form-check-label">Fast Food</label>
                          </div>
                          <div className="form-check">
                          <input type="checkbox" 
                                 className="form-check-input"
                                 value="5"
                                 onChange={(event) => setFilterLogic(event, "cuisines")}
                                 />
                          <label htmlFor="" 
                                 className="form-check-label">Street Food</label>
                          </div>
                      </div>
                
                      <div className="mb-3 ms-1">
                          <label htmlFor="" 
                                 className="form-label" >Cost For Two</label>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input" 
                                 value="0-500"
                                 name="cost"
                                 onChange={(event) => setFilterLogic(event, "cost")}/>
                          <label htmlFor="" 
                                 className="form-check-label" >Less than ` 500</label>
                          </div>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input"
                                 value="500-1000"
                                 name="cost"
                                 onChange={(event) => setFilterLogic(event, "cost")}/>
                          <label htmlFor="" 
                                 className="form-check-label">` 500 to ` 1000</label>
                          </div>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input"
                                 value="1000-1500"
                                 name="cost"
                                 onChange={(event) => setFilterLogic(event, "cost")}/>
                          <label htmlFor="" 
                                 className="form-check-label" >` 1000 to ` 1500</label>
                          </div>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input"
                                 value="1500-2000"
                                 name="cost"
                                 onChange={(event) => setFilterLogic(event, "cost")}/>
                          <label htmlFor="" 
                                 className="form-check-label " >` 1500 to ` 2000</label>
                          </div>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input"
                                 value="2000-200000"
                                 name="cost"
                                 onChange={(event) => setFilterLogic(event, "cost")}/>
                          <label htmlFor="" 
                                 className="form-check-label">` 2000+</label>
                          </div>
                      </div>
                      
                      <div className="mb-2 ms-1">
                          <label htmlFor="" 
                                 className="form-label fw-bold ">Sort</label>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input"  
                                 value="1"
                                 name="sort"
                                 onChange={(event) => setFilterLogic(event, "sort")}/>
                          <label htmlFor="" 
                                 className="form-check-label" >Price low to high</label>
                          </div>
                          <div className="form-check">
                          <input type="radio" 
                                 className="form-check-input"
                                 value="-1"
                                 name="sort"
                                 onChange={(event) => setFilterLogic(event, "sort")}/>
                          <label htmlFor="" 
                                 className="form-check-label">Price high to low</label>
                          </div>
                      </div>
                     
                      </div>
                  </aside>
                 
                  <section className="res-cards col-12 col-lg-8 px-0 mt-3 mt-lg-0">
                  {restList.map((restaurants, index) => {
                    return(
                        <div className=" mb-4 p-lg-4 p-1 px-lg-4 px-2 shadow  mb-4"
                             key={index}
                             onClick={() => navigate('/restaurant/' + restaurants._id)}>
                        <section className="d-flex gap-lg-4 gap-2 mb-4">
                          <div className="restaurant-search-img" >
                          <img src={restaurants.image}
                               className="breakfast image"  
                               alt="" />
                          </div>
                          <div>
                              <p className="mb-2 mt-3 fw-bold h3 Big-Chill">{restaurants.name} ({restaurants.aggregate_rating})</p>
                              <p className="mb-1 ms-1 fw-semibold fort">{restaurants.locality}</p>
                              <p className="mb-0 ms-1 dm address">
                                    <i className="fa fa-map-marker text-danger me-1"
                                       aria-hidden="true"></i> 
                                        {restaurants.locality}, {restaurants.city} </p>
                          </div>
                        </section>
                        <hr/>
                      <section className="d-flex gap-5">
                        <div className="cuisines-cost">
                            <p className="mb-1">CUISINES:</p>
                            <p className="mb-1">COST FOR TWO:</p>
                        </div>
                        <div className="bakery-rs" >
                            <p className="mb-1 " > 
                           {restaurants.cuisines.map((cuisines_name) => cuisines_name.name).join(', ') }
                            </p>
                            <p className="mb-1 fw-semibold">₹{restaurants.cost}</p>
                        </div>
                      </section>
                        </div>
                    );
                  })}
                    <section>
                      <div className="pt-3">
                        <nav aria-label="Page_navigation">
                        <ul className="pagination justify-content-center ">
                        {Array.from(Array(pageCount).keys()).map((value, index) => {
                          return(
                            <div className="Page_list">
                            <li className= {page === index ? "active" : ""}
                                key={index}
                                onClick={() =>
                          setFilterLogic(
                            { target: { value: 0 } },
                            "page",
                            index + 1
                          )}>
                        {value + 1}
                      </li>
                      </div>
                          )
                        })}
                        
                       </ul>
                        </nav>
                      </div>
                    </section> 
              </section>
              </section>
          </section>
        </section>
      </main>
    );
}

export default SearchPage;