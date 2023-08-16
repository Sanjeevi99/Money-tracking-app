const express = require('express');
const cors = require('cors');
const app = express();
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

app.get('/api/test', (req,res) => {
    res.json('ok');
    //res.json use to give response in json format
});

app.post('/api/transaction', async (req,res) => {
    await mongoose.connect('mongodb+srv://money:6QYsGULNLhexBskP@cluster0.2m1iig5.mongodb.net/?retryWrites=true&w=majority');

    const {name,price,description,datetime} = req.body;

    const transaction = await Transaction.create({name,description,datetime,price});

    res.json(transaction);
    //req.body contain the data send from frontend form
});

app.get('/api/transactions', async (req,res) => {
    await mongoose.connect('mongodb+srv://money:6QYsGULNLhexBskP@cluster0.2m1iig5.mongodb.net/?retryWrites=true&w=majority');
    const transactions = await Transaction.find();

    res.json(transactions);
})

app.listen (4040);

//6QYsGULNLhexBskP