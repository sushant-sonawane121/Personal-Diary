const express = require("express");
const router = express.Router();
const userController = require("./controller");

router.post("/createuser", userController.createuser);
router.post("/addDiaryPage/:username", userController.addDiaryPage);
router.post("/loginuser", userController.loginuser); 
router.get("/getPages/:username", userController.getPages); 
router.delete("/deletePage/:username/:pageid", userController.deletePage); 
router.delete("/deleteAcc/:username", userController.deleteAcc); 

module.exports = router;
