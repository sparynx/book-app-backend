const express = require('express');
const {
    postAbook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook 
} = require("./book.controller");
const verifyAdminToken = require('../middleware/verifyAdminToken');

const router = express.Router();


//post a book
router.post("/create-book",verifyAdminToken, postAbook);

//get all books
router.get("/", getAllBooks);

//get a single book
router.get("/:id", getSingleBook);

//update a single book
router.put("/edit/:id",verifyAdminToken, updateBook);

//delete a single book
router.delete("/:id",verifyAdminToken, deleteBook);



module.exports = router; 