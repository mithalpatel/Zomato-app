const menuItemModel = require('../model/MenuItemModel');

module.exports.getMenuItemsByRestaurantId = async (request, response) => {
    let {id} = request.params;
    try{
        let result = await menuItemModel.find({ reataurantId: id});
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