
import JWT from 'jsonwebtoken';
import UserModels from '../Models/UserModels.js';

export const requiredLogin = (req, res, next) => {
    try {
        const decode = JWT.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Invalied Token "
        })

    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const user = await UserModels.findById(req.user._id)
        if (user.Role !== 1) {
            return res.status(401).send({
                sucess: false,
                message: "UnAuthorizations Access"
            })
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            sucess: false,
            message: "Error in Admin middlerware"
        })

    }
}