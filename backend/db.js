

const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: String,
    city: String,
    pin: String,    
});

const Item = mongoose.model('Item', ItemSchema);

 const connectDB = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URI || 'mongodb://localhost/myapp');
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
 }

 module.exports = { connectDB, Item };