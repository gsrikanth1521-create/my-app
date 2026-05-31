const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB, Item } = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//  Connect to MongoDB
connectDB();

//Simple item model
// const Item = mongoose.model('Item', new mongoose.Schema({
//   name: String,
// }));

//routes

app.get('/', (req,res) => {
    res.send('Hello World!');
});


app.get('/api/items', async (req,res) => {
  const items = await Item.find();
  res.json(items);
});

app.post('/api/items', async (req,res) => {
  const newItem = new Item({ name: req.body.name, city: req.body.city, pin: req.body.pin });
  console.log("Received new item:", newItem);
  await newItem.save();
  res.json(newItem);
});

app.delete('/api/items/:id', async (req,res) => {
  await Item.findByIdAndDelete(req.params.id);
  const items = await Item.find();
  res.status(200).json({ message: 'Item deleted', items });
});

const port = 3000;

app.listen(port, () => console.log(`API running on port ${port}`));