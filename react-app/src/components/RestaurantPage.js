import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL, checkLogin } from "./base_url";
import Header from "./Header";

function RestaurantPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  let initRestaurant = {
    _id: 0,
    thumb: [],
    name: "",
    city: "",
    location_id: 0,
    city_id: 0,
    locality: "",
    aggregate_rating: 0,
    rating_text: "",
    contact_number: 0 ,
    image: "",
    mealtype_id: 0,
    cost: 0,
    cuisines: [],
    cuisines_id: []
};
let [restaurantDetails, setRestaurantDetails] = useState({ ...initRestaurant });
let [restaurantMenu, setRestaurantMenu] = useState([]);
let [isLogin] = useState(checkLogin());
let [toggle, setToggle] = useState(true);
let [totalCost, setTotalCost] = useState(0);
  let [orderUser, setOrderUser] = useState({
    username:'',
    phoneNumber: '', 
    address: '',
    email: ''
  });

  useEffect(()=>{
    if(isLogin){
      setOrderUser({
        username: '',
        email: '',
        phoneNumber: '',
        address: ''
      })
    }
  },[isLogin])

let getRestaurantDetails = async () => {
  let url = `${BASE_URL}/get-restaurant-details-by-id/${id}`;
    let { data } = await axios.get(url);
    if (data.status === true) {
      
       setRestaurantDetails({...data.result});
    }else {
       setRestaurantDetails([...initRestaurant]);
    }   
};

let getMenuItemsList = async () => {
  let url = `${BASE_URL}/get-menuitems-by-restaurant-id/${id}`;
  let { data } = await axios.get(url);
  if (data.status === true) {
    setRestaurantMenu([...data.result]);
  }else {
    setRestaurantMenu([]);
  }   
 };

 let manageIncQty = (index) =>{
  let _restaurantMenu = [...restaurantMenu];
  _restaurantMenu[index].qty += 1;
  setTotalCost(totalCost + _restaurantMenu[index].cost)
  setRestaurantMenu(_restaurantMenu);
};

let manageDecQty = (index) =>{
  let _restaurantMenu = [...restaurantMenu];
  _restaurantMenu[index].qty -= 1;
  setTotalCost(totalCost - restaurantMenu[index].cost)
  setRestaurantMenu(_restaurantMenu);
};

useEffect(()=> {
  getRestaurantDetails();
  getMenuItemsList();
 },[])

 let loadScript = () => {
  let script = document.createElement('script')
  script.src ='https://checkout.razorpay.com/v1/checkout.js'
  document.body.appendChild(script);
  return true;
 };
 console.log(loadScript);
 let makePayment =  async ()=>{
 /* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> <script>*/
   //await loadScript();
   try{
    let { data } = await axios.post(BASE_URL + "create-order", {
      amount: totalCost,
    });
    
   let { order } = data;

var options = {
  key: "rzp_test_RB0WElnRLezVJ5", // Enter the Key ID generated from the Dashboard
  amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: order.currency,
  name: "Zomato clone app", //your business name
  description: "Online Payment",
  image: "https://cdn.iconscout.com/icon/free/png-256/zomato-1937646-1637644.png",
  order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
 // callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
  handler: async (response) => {
    let {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = response;
    //alert(response.razorpay_payment_id);//payment_id)
   // alert(response.razorpay_order_id);//order_id
    //alert(response.razorpay_signature);//signature =>order_id + payment_id + sec_key
    
    

    let userOrders = restaurantMenu.filter((menu) => {
      return menu.qty > 0;
    });
    
    let sendData = {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      signature: razorpay_signature,
      order_list: userOrders,
      total: totalCost,
      username: orderUser.username,
      user_Email: orderUser.email,
      mobile_no: orderUser.phoneNumber,
      address: orderUser.address
    };
    let { data } = await axios.post(BASE_URL + 'verify-payment', sendData)
       if (data.status === true) {
        alert('Payment Sucessfull');
        window.location.assign('/');
       } else{ 
        alert('Payment Failed')
       }
  },
  prefill: {
      name: orderUser.username, //your customer's name
      email:orderUser.email,
      contact: orderUser.phoneNumber,
      address: orderUser.address,
  }
  
};
try{
  var rzp1 = new window.Razorpay(options);
  rzp1.open();
 } catch (error){
   alert('unable to load try again');
 }
  } catch (error) {
    alert ('Server error')
    console.log('error')
  }  
};

let inputChange = (event) => {
  let { value, name } = event.target;
  orderUser[name] = value;
  setOrderUser({ ...orderUser });
}

  return(
    <>
    <div className="modal fade" id="gallery" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg">
    <div className="modal-content ">
     <div className="modal-body">
      
     <Carousel infiniteLoop={true} showThumbs={false}>
  {restaurantDetails.thumb.map((value, index) => {
    return (
      <div key={index} > 
     <img src={'/Images/assects/' + value}
          className="d-block w-100 h-25" 
          alt="..."/>
     </div>
    )
     
  })}
  </Carousel>
  
</div>
      
      </div>
    </div>
  </div>

     <div className="modal fade" 
          id="modalAccount" 
          aria-hidden="true"
          aria-labelledby="exampleModalToggleLabel2" 
          tabIndex="-1">
     <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
       <div className="modal-header">
        <h1 className="modal-title fs-5" 
            id="exampleModalToggleLabel2">User Details</h1>
        <button type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <div className="mb-3">
    <label htmlFor="user-name" 
           className="form-label fw-semibold">Name</label>
    <input type="text" 
           value={orderUser.username}
           onChange={inputChange}
           placeholder="Enter your name"
           className="form-control mb-3" 
           aria-describedby="emailHelp" />
           <label htmlFor="email" 
           className="form-label fw-semibold">Email</label>
    <input type="text" 
           value={orderUser.email}
           onChange={inputChange}
           placeholder="Enter your Email-Id"
           className="form-control" 
           aria-describedby="emailHelp" />
    <label htmlFor="mobile-number" 
           className="form-label fw-semibold">Mobile Number</label>
    <input type="text" 
           value={orderUser.phoneNumber}
           onChange={inputChange}
           placeholder="Enter mobile number"
           name="phoneNumber"
           className="form-control" 
           aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="enter-address" 
           className="form-label fw-semibold">
               Address
    </label>
    <textarea type="text" 
              className="form-control text-secondary"
              placeholder="Enter your address"
              name="address"
              value={orderUser.address}
              onChange={inputChange}> </textarea>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" 
           className="form-check-input" 
           id="exampleCheck1"/>
    <label className="form-check-label" 
           htmlFor="exampleCheck1">Check me out</label>
  </div></div>
      <div className="modal-footer d-flex justify-content-between">
        <button className="btn btn-light border-dark" 
                data-bs-target="#restMenuModal" 
                data-bs-toggle="modal">Back</button>
        <button type="submit" 
                className="btn btn-danger"
                onClick={makePayment}>PROCEED</button>
      </div>
    </div>
  </div>
</div>

                {/* <!-- Modal --> */}
        
<div className="modal fade" 
     id="restMenuModal" 
     data-bs-backdrop="static" 
     data-bs-keyboard="false" 
     tabIndex="-1" 
     aria-labelledby="restMenuModalLabel" 
     aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div className="modal-content">
      <div className="modal-header">
        <h3 className="modal-title " 
            id="restMenuModalLabel">  
          {restaurantDetails.name}
       </h3>
        <button type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close"> </button>
      </div>

      <div className="modal-body">
        {
          restaurantMenu.map((menuItem, index) => {
            return(
              <div key={index} className="row p-2">
                          <div className="col-8">
                              <p className="mb-1 h6">{menuItem.name}</p>
                              <p className="mb-1">₹ {menuItem.cost}</p>
                              <p className="small text-muted">{menuItem.description}</p>
                          </div>
                          <div className="col-4 d-flex justify-content-end">
                              <div className="menu-food-item">
                                  <img src={menuItem.image} height="92px" 
                                  width="92px" alt=""/>

                                  {menuItem.qty <= 0 ? ( 
                                  <button onClick={() => manageIncQty(index)} 
                                          className="btn btn-light fw-semibold text-success btn-sm add-qty">ADD</button>
                                  ) 
                                  : 
                                  ( <div className="order-item-count section text-center mt-1">
                                  <span className="symbl-1  pe-1" onClick={() => manageDecQty(index)}> - </span>
                                  <span className="qty-hand ps-1 pe-1 text-success "> {menuItem.qty} </span>
                                  <span className="symbl-1 ps-1 " onClick={() => manageIncQty(index)}> + </span>
                              </div>)}
                            </div>
                          </div>
                          <hr className="p-0 my-2"/>
                      </div>
                      );
                       })
                      }
                </div>
                  <div className="modal-footer d-flex total justify-content-between p-4 pt-2">
                   <h4>Total: {totalCost}</h4>
                   {
                      totalCost > 0 ? (
                         <button className="btn btn-danger text-light" 
                                 data-bs-toggle="modal" 
                                 data-bs-target="#modalAccount" >   Pay Now   </button>
                      ) 
                     : 
                     null
                    }
               </div>
            </div>
         </div>
     </div>

     {/*<!-- restaurant Page -->*/}
     <div className="bg-danger">
               <p className="e-logo text-center ms-3 brand fw-bold h3" 
             onClick={()=>navigate('/menu')} >  e!  </p>
                 <Header/>
               </div>
               <section>
        <div className= "rest-image ms-md-3 me-md-3">
            <img src= {restaurantDetails.image} 
                 width="100%"  
                 height="350px" 
                 alt=""/>
        </div>
        <button className="gallery btn font-normal normal 600 16px/30px Poppins" 
                data-bs-toggle="modal" 
                data-bs-target="#gallery"
                type="button" >
            Click to see Image Gallery
        </button>
      </section>
      <section className="d-flex gap-lg-4 gap-2 mb-2 mt-4 ms-4">
        <div className="restaurant-search">
        <img src= {restaurantDetails.image} 
             className="breakfast-img d-md-none"
             alt="" />
        </div>
        <div className="chilli">
            <p className="big-chill mt-3 ms-2 fw-bold h3 ">{restaurantDetails.name}</p> 
        </div>
    </section>
    {
    isLogin ? (
        <button className="btn btn text-light ordrclick " 
                type="button" 
                data-bs-toggle="modal" 
                data-bs-target="#restMenuModal"> 
              Place Online Order 
        </button>
    ) : ( 
        <button className="btn btn text-light ordrclick " 
                type="button"> 
              Please Login 
        </button>
    )
   }

      <div className="about d-flex mb-0">
            <p className= { toggle ? "border-bottom border-4 border-danger ov-view" : null }
               onClick={() => setToggle(true)}>  Overview  </p>
            <p className= { !toggle ? "border-bottom border-4 border-danger cont-act" : null}
               onClick={() => setToggle(false)}>  Contact  </p>
      </div>{ toggle ? (<section className="place-info ms-5 mt-5 mb-3">
      <div className="text fw-bold fs-5 mb-4" > About this place  </div>
      <div className="title fw-bold mb-1" >  Cuisine  </div> 
      <div className="card-text fw-normal mb-4 text-secondary" > {restaurantDetails.cuisines.map((cuisines_name)=> cuisines_name.name).join(',')} </div>
       <div className="card-menu  fw-bold mb-1">  Average Cost  </div>
      <div className="card-text mb-2 fw-normal text-secondary" >
              ₹ {restaurantDetails.cost} for two people (approx.)  </div>
      </section>) : (<section className="contact-info ms-5 mt-5 mb-3">
  <div className="card-text fw-normal mb-1 text-secondary" >Phone Number</div>
  <div className="card-text fw-normal mb-4 text-danger" >+91 {restaurantDetails.contact_number}</div>
  <div className="card-menu  fw-bold mb-1" >Address</div>
 <div className="card-text mb-2 fw-normal text-secondary" >{restaurantDetails.Address}, {restaurantDetails.locality}, {restaurantDetails.city}</div>
      </section> )}
   </>
  )
}
export default RestaurantPage;