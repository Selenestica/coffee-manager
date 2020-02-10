const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const PORT = 3333
const Order = require('./models/order')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
mongoose.set('useFindAndModify', false)

mongoose.connect('mongodb://localhost:27017/coffee', {useNewUrlParser: true, useUnifiedTopology: true})

//create
app.post('/add-order', (req, res) => {
    const order = new Order({
        name: req.body.name,
        customer_email: req.body.customer_email,
        order_date: Date(),
        coffee_type: req.body.coffee_type
    })
    order.save().then(doc => res.send('order added xd'))
    .catch(error => console.log(error))
})

//read
app.get('/view-orders', (req, res) => {
    Order.find({}).then(orders => res.json(orders))
})

//update
app.put('/view-orders/update/:orderId', (req, res) => {
    const orderId = req.params.orderId
    const name = req.body.name
    const customer_email = req.body.customer_email
    const coffee_type = req.body.coffee_type

    Order.findByIdAndUpdate(orderId, {
        name: name,
        customer_email: customer_email,
        coffee_type: coffee_type
    }).then(res.send('order updated!')).catch(error => res.send(error))
})

//delete
app.post('/delete-order/:orderId', (req, res) => {
    const orderId = req.params.orderId
    Order.findOneAndDelete(orderId).then(() => res.send('order deleted'))
})

//find order by email
app.get('/find-order/:email', (req, res) => {
    const email = req.params.email
    Order.find({customer_email: email}).then(orders_by_email => res.json(orders_by_email))
})










app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})