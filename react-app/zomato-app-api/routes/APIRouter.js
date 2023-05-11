
const APIRouter = require('express').Router();
const location = require('../controller/LocationController');
const mealtype = require('../controller/MealTypeController');
const restaurant = require('../controller/RestaurantController');
const menuitem = require('../controller/MenuItemController');
const payment = require('../controller/OrderController');
const user = require('../controller/UserController');

//routing

APIRouter.get('/', location.home);
APIRouter.get('/get-location-list', location.getLocation);
APIRouter.get('/get-location-by-id/:id', location.getLocationById);
APIRouter.get('/get-mealtype-list', mealtype.getMealTypeList);
APIRouter.get('/get-restaurant-list', restaurant.getRestaurantList);
APIRouter.get('/get-restaurant-by-location/:loc_id' ,restaurant.getRestaurantByLocation);
APIRouter.get('/get-restaurant-details-by-id/:id', restaurant.getRestaurantDetailById);
APIRouter.get('/get-menuitems-by-restaurant-id/:id', menuitem.getMenuItemsByRestaurantId);

APIRouter.post('/filter', restaurant.filter);
//APIRouter.post('/payment', payment.saveOrder);
APIRouter.post("/create-order", payment.createOrder);
APIRouter.post("/verify-payment", payment.verify);
APIRouter.post("/sign-up", user.UserSignUp);
module.exports = APIRouter;