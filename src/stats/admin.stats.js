 const mongoose = require("mongoose");
const express = require("express");

const Order = require("../orders/orders.model");
const Book = require("../book/book.model");

const router = express.Router();

//function to calculate the admin stats

router.get("/", async (req, res) => {
    try {
        //total number of orders
        const totalOrders = await Order.countDocuments();

        //total sales (sum of totalprice from orders)
        const totalSales = await Order.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: {$sum: "$totalPrice"},
                }
            }
        ]);

        //trending book statistics
        const trendingBookCount = await Order.aggregate([
            {$match: {trending: true}}, //match only trending books
            {$count: "trendingBookCount"} //count trending books
        ])

        //extract the count as just a number 
        const trendingBooks = trendingBookCount.length > 0 ? trendingBookCount[0].trendingBookCount : 0;


        //total number of books
        const totalBooks = await Book.countDocuments();


        // monthly sales (group by month )
        const monthlySales = await Order.aggregate([
            {
                $group: {
                    _id: {$dateToString: {format: "%Y-%m", date: "$createdAt"}},
                    totalSales: {$sum: "$totalPrice"},
                    totalOrders: {$sum: 1}
                }
            },
            {$sort: {_id: 1}}
        ]);

        res.status(200).json({ totalOrders,
            totalSales: totalSales[0]?.totalSales || 0,
            trendingBooks,
            totalBooks,
            monthlySales
        })


    } catch (error) {
        console.error("Error fetching admin stats",error);
        res.status(500).json({message: "Error fetching admin stats"});
    }
})

module.exports = router;