const jwt = require("jsonwebtoken");
const userModel = require('../models/UserModel')

const checkRoleAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        const userData = await userModel.findById(tokenData.id)

        //TODO ['user'].includes('user')
        if (userData.isAdmin) { //TODO:
            next()
        } else {
            res.status(409)
            res.send({ error: 'User not Admin!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Internal Error!' })
    }

}

const verifyToken = async(token)=>{
    try{
        return jwt.verify(token,process.env.JWT_SEC)
    }catch(e){
        return null;
    }
}

module.exports = checkRoleAuth