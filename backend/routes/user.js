const router = require("express").Router();

const { createUser, loginUser,logoutUser, getAllUser, getUser, deleteUser, updateaUser } = require("../controller/userControl");


router.post("/registro", createUser )
router.post("/login", loginUser )
router.put("/:id", updateaUser)
router.get("/all-user", getAllUser)
router.get("/:id",  getUser)
router.delete("/:id", deleteUser)
router.post("/logout", logoutUser)


module.exports = router