const express = require('express');
const {createAnOrder, getOrderByEmail} = require("./order.controller")

const router = express.Router();

//post request to create order
router.post("/", createAnOrder);

//get orders by users email address
router.get("/email/:email", getOrderByEmail);


module.exports = router;