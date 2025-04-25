const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/myOrderData', async (req, res) => {
  try {
    const email = req.body.email;
    if (!email) {
      return res.status(400).json({ error: "Email not provided" });
    }

    const myData = await Order.findOne({ email });
    if (!myData) {
      return res.status(404).json({ error: "No orders found" });
    }

    res.json({ orderData: myData });
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).send("Server error");
  }
});

module.exports = router;
