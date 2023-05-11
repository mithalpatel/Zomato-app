const UserModel = require("../model/UserModel");
const bcrypt = require("bcrypt");
const { request, response } = require("express");

module.exports.UserSignUp = async(request, response) => {
    let data = request.body;
    let password = data.password;
    let saltRound = 10;

    try{
        let salt = await bcrypt.genSalt(saltRound);
        let hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            email: data.email,
            password: hashPassword,
            firstname: data.firstname ? data.firstname : undefined,
            lastname: data.lastname ? data.lastname : undefined
        });
        let result = await UserModel.findOne({ email: data.email });
        // check already exist email
        if(result) {
            response.status(200).send({
                status: false,
                message: 'This Email is already exist, please use another email'
            });
        } else{
            let saveResult = await newUser.save();
            response.status(200).send({
                status: true,
                result: saveResult
            });
        }
    } catch(error) {
        response.status(500).send({
            status: false,
            message: 'Server Error',
            error
        });
    }
}