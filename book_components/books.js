const mongoose = require('mongoose');
const {Schema} = mongoose;


//Defining my books schema with title, description, status
const booksSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String 
});
//Model for books using my schema
const Books = mongoose.model('Book', booksSchema);

//3 arrays with book information using the insertmany method on line 21
const bookData = [
    new Books({title: 'Not Without Laughter', description: 'Harlem Renaissance', status: 'Fiction'}),
    new Books({title: 'Selected Poems', description: 'Book of Poems', status: 'Non Fiction'}),
    new Books({title: 'The Big Sea', description: 'Autobiographical', status: 'Non Fiction'})
];

const Dburl = "mongodb+srv://EazyE:june231935@eazye.1ri0ryo.mongodb.net/"

mongoose.connect(Dburl)
.then(()=>{ 
    console.log("Connected Successfully") 
    Books.insertMany(bookData);
})

module.exports = Books;


