import {Router} from "express"
import {checkAuth,logoutUser,loginUser,registerUser} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/check-auth").get(verifyJWT,checkAuth)

export default router;