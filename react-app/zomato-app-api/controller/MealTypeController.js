const mealtypeModel = require('../model/MealTypeModel');

module.exports.getMealTypeList = async (request, response) => {
    try{
        let result = await mealtypeModel.find();
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