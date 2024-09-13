const Router = require('express');
const { signup, verifyotp, login, getuserinfo, updateProfile } = require('../controllers/authcontroller');
const { verifyToken } = require('../middlewares/authmiddleware');
const route = Router();

route.post("/signup", signup);
route.post("/otp-verification", verifyotp);
route.post("/login", login);
route.get("/user-info",verifyToken, getuserinfo);
route.post("/update-profile", verifyToken, updateProfile);


module.exports = route;