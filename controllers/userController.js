const { user } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const encryptedPassword = bcrypt.hashSync(password, 10);


        const newUser = await user.create({
            email, 
            password: encryptedPassword
        });

        const token = jwt.sign({id: newUser.id}, env.process.SECRET);
        
        res.status(201).json({
            userToken: token
        });
    }

    catch(error) {
        console.log(error);
        res.status(404).json({
            error
        });
    }
}


module.exports = userController;