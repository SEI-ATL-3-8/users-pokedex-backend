const userController = require('../controllers/userController') 

userController.signUp = async (req, res) => {
    try {
        const user = await models.user.create({
            email: req.body.email,
            password: req.body.password
        })
        res.json({message: 'You successfull signed up!', email: user.email})
    } catch (error) {
        console.log(error)
    }
}

module.exports = userController