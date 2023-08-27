import controller from "../did.controller.js";
import express from "express";
const router = express.Router();

router.post("/register", controller.signUp_DID);
router.post("/new-record", controller.addRecord_DID)

export default router;