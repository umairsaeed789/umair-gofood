const mongoose = require('mongoose')
const router = require('./CreateUser');
const Order = require('../models/Orders');

router.post('/OrderData', async(req, res)=>{
    let data = req.body.order_data
    console.log("Body",req.body);
    
    await data.splice(0,0,{Order_date: req.body.order_date})

    let eID = await Order.findOne({'email': req.body.email})
    console.log(eID);
    if (eID === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(()=>{
                res.json({success: true})
            })
        } catch (error) {
            console.log(error.message);
            res.send("Server Error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({
                email: req.body.email
            },{
                $push: {order_data: data}
            }).then(()=>{
                res.json({success: true})
            })
        } catch (error) {
            
            res.send("Server Error", error.message)
        }
    }
})

// router.post('myorderData', async (req, res)=>{
//     try {
//         let myData = await Order.findOne({'email':req.body.email})
//         res.json({orderData:myData})
//     } catch (error) {
//         res.send("Server Error", error.message)
//     }
// })

module.exports = router;