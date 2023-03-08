const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());

let salesCollection;
let purchasesCollection;
let expensesCollection;
let usersCollection;
  //Complete Transactions API's
  app.get('/api/sales', (req, res) => {
    salesCollection.find().toArray((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.post('/api/sales',(req, res) => {
    const newData = req.body;
    salesCollection.insertOne(newData, async(err, result) => {
      await usersCollection.updateOne({ username: req.body.username },{ $push: { transactions: {...newData, trade:'sale'}}})
      res.json(result);
    });
  });

  
  app.post('/api/sales/search', (req, res) => {
    salesCollection.find({ name: "John Smith" }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });

  app.post('/api/sales/date-range', (req, res) => {
    salesCollection.find({
        "created_at": {
          $gte: ISODate(req.body.start),
          $lte: ISODate(req.body.end)
        }
      }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });

  //Debits API's
  app.get('/api/purchases', (req, res) => {
    purchasesCollection.find().toArray((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });

  app.post('/api/purchases', (req, res) => {
    const newData = req.body;
    purchasesCollection.insertOne(newData, async(err, result) => {
      await usersCollection.updateOne({ username: req.body.username },{ $push: { transactions: {...newData, trade:'purchase'}}})
      res.json(result);
    });
  });

  app.delete('/api/purchases', (req, res) => {
    const newData = req.body;
    purchasesCollection.deleteOne(({ name: "John" }), (err, result) => {
      if (err) throw err;
      res.json(result.ops[0]);
    });
  });

  app.post('/api/purchases/search', (req, res) => {
    purchasesCollection.find({ name: "John Smith" }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });

  app.post('/api/purchases/date-range', (req, res) => {
    purchasesCollection.find({
        "created_at": {
          $gte: ISODate(req.body.start),
          $lte: ISODate(req.body.end)
        }
      }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });

  //ExpensesAPI's
  app.get('/api/expenses', async(req, res) => {
    const cursor = expensesCollection.find()
    const result = await cursor.toArray();
    res.json(result)
  });

  app.post('/api/expenses', (req, res) => {
    const newData = req.body;
    expensesCollection.insertOne(newData, (err, result) => {
      res.json({error: 0, acknowledged: result.acknowledged});
    });
  });

  app.post('/api/expenses/date-range', (req, res) => {
    expensesCollection.find({
        "created_at": {
          $gte: ISODate(req.body.start),
          $lte: ISODate(req.body.end)
        }
      }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });

  app.post('/api/expenses/search', (req, res) => {
    expensesCollection.find({ name: "John Smith" }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });
 
  //Users Api's
  app.get('/api/users', async(req, res) => {
    const cursor = usersCollection.find()
    const result = await cursor.toArray();
    res.json(result)
  });

  app.post('/api/users', async(req, res) => {
    const newData = req.body;
    const cursor = usersCollection.find({username: req.body.username})
    const result = await cursor.toArray();
    if(result.length === 0){
      usersCollection.insertOne(newData, (err, result) => {
        res.json({error: 0, acknowledged: result.acknowledged});
      });
    }else{
      res.json({error: 1, msg:'User already exist'});
    }
  });

  app.post('/api/users/date-range', async(req, res) => {
    const cursor = usersCollection.find({ 'transactions.created_at': {
          $gte: ISODate(req.body.start),
          $lte: ISODate(req.body.end)
        }
      })
    const result = await cursor.toArray();
    res.json(result)
  });
  app.put('/api/users/transaction-history', (req, res) => {
    const newData = req.body;
    usersCollection.update((
        { _id: ObjectId("yourObjectId") },
        { $push: { transactions: yourData } }
    ),(err, result) => {
        if (err) throw err;
        res.json(result.ops[0]);
      })
  });
  
  app.post('/api/users/search', (req, res) => {
    usersCollection.find({ username: "John Smith" }).toArray((err, data) => {
        if (err) throw err;
        res.json(data);
      });
  });

 // Start the server
 app.listen(3001, () => {
    mongoose.connect('mongodb://localhost:27017/CurrencyApp', {useUnifiedTopology: true});   
    const database = mongoose.connection;
    database.once('open', () => {
        salesCollection = database.collection('sales');
        purchasesCollection = database.collection('purchases');
        expensesCollection = database.collection('expenses');
        usersCollection = database.collection('users');
        console.log('Connected to MongoDB database.');
    });
    database.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });
});

