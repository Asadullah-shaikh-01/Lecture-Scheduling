import express from "express";
import { loginController, registerController, testController } from "../Controller/UserController.js";
import { requiredLogin } from "../middleware/UserMiddleware.js";



const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);

router.get('/testing', requiredLogin, testController);

//Private Rouete
router.get('/user-auth', requiredLogin, (req, res) => {
    res.status(200).send({ ok: true })
});




export default router;

