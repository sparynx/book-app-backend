const Order = require("./orders.model");

const createAnOrder = async (req, res) => {
    try {
        const newOrder = await Order(req.body);
        const savedorder = await newOrder.save();
        res.status(200).json(savedorder);
    } catch (error) {
        console.error("Error creating order", error);
        res.status(500).json({message: "Error creating order"})
    }

}

const getOrderByEmail = async (req, res) => {

    try {
        const {email} = req.params;
        const orders = await Order.find({email}).sort({createdAt: -1});

        if(!orders){
            return res.status(404).json({message: "orders not found"});
        }
        return res.status(200).json(orders)
    } catch (error) {
        console.error("Error fetching orders", error);
        res.status(500).json({message: "Unable to fetch order"})
    }


}






module.exports = {
    createAnOrder,
    getOrderByEmail,
}