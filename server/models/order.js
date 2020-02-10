const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    name: String,
    order_date: String,
    coffee_type: String,
    customer_email: String
})

let Order = mongoose.model('Order', orderSchema)

module.exports = Order