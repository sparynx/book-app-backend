const express = require('express');
require('dotenv').config()
const cors = require('cors');
//import mongoose
const mongoose = require('mongoose');

//the env file import


const app = express();

const port = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173", "https://book-app-frontend-seven-iota.vercel.app"],
    credentials: true
}));



//routes
const bookRoutes = require("./src/book/book.route");
const userRoutes = require("./src/users/user.route");
const orderRoutes = require("./src/orders/order.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
    await mongoose.connect(process.env.DB_URI);

    app.use("/", (req, res) => {
        res.send('book server is listening');
    })
}

main().then(() => console.log("mongodb connected succesfully")).catch(err => console.log(err));

//listen on port , or start the server
app.listen(port, () => {
    console.log(`listening on port ${port}`)
});
