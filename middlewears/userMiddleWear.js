const models = require('../models');
const jwt = require('jsonwebtoken');

const userAuth = async(req, res, next) => {

    try {
        if (req.headers.authorization) {
            const { authorization } = req.headers;
         
   

            const { id } = jwt.verify(authorization, process.env.SECRET);
          
            const user = await models.user.findOne({
                where: {
                    id
                }
            });
            
        
            
        
            req.user = user;
        
            next();
        }
        else {
            next();
        }
      
    }
    catch(error) {
        res.status(401).json(error);
    }

    
}

module.exports = {userAuth};