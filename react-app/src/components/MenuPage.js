import axios  from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "./base_url";

function Menupage() {
    const navigate = useNavigate();
    let [mealTypeList, setMealTypeList] = useState([]);
    
  
    let getMealTypeList = async() => {
        let url = `${BASE_URL}get-mealtype-list`;
        let { data } = await axios.get(url);
        if (data.status === true) {
            setMealTypeList([...data.result]);
        } else {
            setMealTypeList([]);
        }   
    };

    useEffect(() => {
        getMealTypeList();
    },[]);
       
    return (
        
        <main className="container-fluid">
       <div className="row bar bg-danger" 
            style={{height: '4rem', marginLeft: '1px', marginRight: '1px'}}>
        <nav className="col-11 col-lg-11 m-auto py-3">
         <p className="e-logo text-center ms-3 brand fw-bold h3" 
            style={{marginTop: '-6px'}}
            onClick={()=> navigate('/')}  >  e!  </p>
             <button className='menu-logout btn btn-sm btn-danger'
                     onClick={()=> navigate('/')}
                     style={{marginLeft: '90%', border: '1px solid white'}}    >
                            Log out
                   </button>
        </nav>
        </div>
          <div className="restaurants ">
              <p className="title fs-1 position-relative fw-bold  pt-4 ps-lg-5 ms-3 font: normal normal bold 30px/46px 'Poppins'">
                  Quick Searches
              </p> 
               <p className="restaurent fs-5 position-relative mt-2 pt-1 ps-lg-5 ms-3 font:normal normal normal 18px/27px 'Poppins'" >
                  Discover restaurants by type of meal
               </p>
            </div>
          <div className="cards d-flex flex-wrap mt-2 ms-3 me-3 ps-lg-5 pe-5 mb-5 pb-5 justify-content-between">
             {mealTypeList.map((mealType,index)=> {
              return(
                <div key={index}
                     className="card-1 d-flex flex-wrap-wrap mt-5 shadow bg-body" >
              <div className="card-image-1" 
                   onClick={() => {navigate('/search/' + mealType.meal_type + '/' + mealType.name);
                   }}>
               <img src={"../Images/" + mealType.image} 
                    height="160px" 
                    width="160px" 
                    alt="" />
                 <h4 className="card-title" >
                   {mealType.name}
                 </h4>
                  <p className="card-text  font: normal normal normal 14px/21px Poppins;">
                     {mealType.content}
                  </p>
              </div>
                </div>
              );
             })}
  </div>
  </main>
    );
  }
  
  export default Menupage;
  