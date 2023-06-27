const { Signup, Login, Logout } = require("../Controllers/AuthController");
const { userVerification, tokenVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();


router.post("/signup", Signup);
router.post('/login', Login);
router.post("/logout", Logout);

router.post('/', userVerification, tokenVerification);





module.exports = router;

