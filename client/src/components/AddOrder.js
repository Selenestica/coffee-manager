import React, { useState } from 'react'

function AddOrder() {

    const [orderInfo, setOrderInfo] = useState({})

    const handleChange = (e) => {
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value
        })
    }

    const onHandlePlaceOrder = () => {
        fetch('http://localhost:3333/add-order', {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(orderInfo)
        }).then(response => response.json())
        .then(json => console.log(json))
    }

    return(<>
    
        <input type="text" name="name" placeholder="name" onChange={handleChange} />
        <input type="text" name="customer_email" placeholder="email" onChange={handleChange} />
        <input type="email" name="coffee_type" placeholder="coffee" onChange={handleChange} />
        <input type="hidden" name="date" />
        <button onClick={onHandlePlaceOrder}>Place Order</button>

    </>)

}

export default AddOrder