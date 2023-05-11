const locationModel = require ('../model/LocationModel');

module.exports.home  = (request, response) => {
    response.status(200).send({
        status: true,
        message:"Welcome"
    });
};

module.exports.getLocation = async (request, response) => {
    let result = await locationModel.find();
    response.status(200).send({
        status: true,
        result,
        //locationList [if the both names are same we can use once]
    });
};

module.exports.getLocationById = async (request, response) =>{
    let {id} = request.params;
    let result = await locationModel.find({location_id: id});
    if(result){
        response.status(200).send({
            status: true,
            result,
        });
    } else {
        response.status(200).send ({
            status: false,
            message: "location not found"
        });
    }
    
};