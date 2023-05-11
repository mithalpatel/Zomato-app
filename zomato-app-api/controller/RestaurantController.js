const restaurantModel = require('../model/RestaurantModel');



module.exports.getRestaurantList = async (request, response) => {
    try{
        let result = await restaurantModel.find();
        response.status(200).send({
            status: true,
            result,
        });
    }catch(error) {
        console.log(error)
        response.status(500).send({
            status:false,
            message: 'Server error',
        });
    }
};

module.exports.getRestaurantByLocation = async (request, response) => {
    let {loc_id} = request.params;
    try{
        let result = await restaurantModel.find({location_id:loc_id});
        response.status(200).send({
            status: true,
            result,
        });
    }catch(error) {
        console.log(error)
        response.status(500).send({
            status:false,
            message: 'Server error',
        });
    }
};

module.exports.getRestaurantDetailById = async (request, response) => {
    let {id} = request.params;
    try{
        let result = await restaurantModel.findById(id);
        response.status(200).send({
            status: true,
            result,
        });
    }catch(error) {
        console.log(error)
        response.status(500).send({
            status:false,
            message: 'Server error',
        });
    }
};

module.exports.filter = async (request, response) => {
    let {meal_type, 
         location, 
         cuisines, 
         sort, 
         hcost, 
         lcost, 
         page,
    } = request.body;

    sort = sort ? sort : 1;
   
    page = page ? page : 1;
    let perPage = 2;
    let startIndex = page * perPage - perPage;
    let endIndex = page * perPage;
    
    let filterRecord = {};
    if (meal_type !== undefined) filterRecord['mealtype_id'] = meal_type;
    if (location !== undefined) filterRecord['location_id'] = location;
    if (cuisines !== undefined) filterRecord['cuisines_id'] = {$in: parseInt(cuisines) };
    if (lcost !== undefined && hcost !== undefined) filterRecord["cost"] = { $gt: parseInt(lcost), $lt: parseInt(hcost) };
    

    try{
        let result = await restaurantModel.find(filterRecord).sort({
            cost: sort,
        });
        let pageCount = Math.round(result.length / perPage);
        result = result.slice(startIndex, endIndex);
        response.status(200).send({
          status: true,
          result,
          pageCount,
          page,
        });
      } catch (error) {
        console.log(error);
        response.status(500).send({
          status: false,
          message: "server error",
        });
      }
    };