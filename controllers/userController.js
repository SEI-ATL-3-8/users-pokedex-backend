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
       
        const token = jwt.sign({id: newUser.id}, process.env.SECRET);

        console.log(token);
        
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

userController.login = async(req, res) => {
    try {
        const { email, password } = req.body;

        const findUser = await user.findOne({
            where: {
                email
            }
        });
      
        if (findUser === null ) res.status(401).json({error: 'user not found'});

        if (bcrypt.compareSync(password, findUser.password)) {
            console.log(findUser);
            const token = jwt.sign({id: findUser.id}, process.env.SECRET);
         
            res.json({
                userToken: token
            });
        }

        else {

            res.status(401).json({
                error: "Wrong Password"
            });
        }   


    }
    catch(error) {
        res.status(400).json(error);
    }
}

userController.verify = (req,res) => {
    
    try {
        if (req.user) {
            res.json({message:'ok'});
        }
    }
    catch(error) {
        console.log(error);
    }

}


module.exports = userController;