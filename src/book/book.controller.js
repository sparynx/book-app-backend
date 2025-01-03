const Book = require('./book.model');


const postAbook = async (req, res) => {
    // console.log(req.body); to ascertain that the request is sending a book

    try {
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "book saved successfully", book: newBook});
    } catch (error) {
        console.error("Error creating book",error);
        res.status(500).send({message: "Failed to create book"});
    }
}

const getAllBooks = async (req, res) => {
    try {
        const book = await Book.find().sort({createdAt: -1});
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching all books",error);
        res.status(500).send({message: "Failed to fetch all books"});
    }
}

const getSingleBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        
        if (!book) {
            res.status(404).send({message: "Book not found"});
        }
        res.status(200).send(book);
    } catch (error) {
        console.error("Error fetching book",error);
        res.status(500).send({message: "Failed to fetch book"});
    }
};

const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
        if(!updatedBook) {
            res.status(404).send({message: 'Book not found'});
        }
        res.status(200).send({
            message: "book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        console.error("Error updating book",error);
        res.status(500).send({message: "Failed to update book"});
    }
}

const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        
        if(!deletedBook) {
            res.status(404).send({message: 'Book not found'});
        }
        res.status(200).send({
            message: "Book deleted successfully",
            book: deletedBook,
    });
    } catch (error) {
        console.error("Error deleting book",error);
        res.status(500).send({message: "Failed to delete book"});
    }
};

module.exports = {
    postAbook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
};