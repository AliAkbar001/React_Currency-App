const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const ObjectId = mongoose.Types.ObjectId;
let salesCollection;
let purchasesCollection;
let expensesCollection;
let usersCollection;
let utilitiesCollection;

//login
app.post('/api/login', async(req, res) => {
  const cursor = utilitiesCollection.find()
  let result = await cursor.toArray();
  result = result[0]
  if(req.body.email === result.email && req.body.password === result.password){
    res.json({'authentication': true})
  }else{
    res.json({'authentication': false})
  }
});

//Currency
app.get('/api/currencies', async(req, res) => {
  const cursor = utilitiesCollection.find()
  let result = await cursor.toArray();
  result = result[0].currrences
  res.json(result)
});

  //Complete Transactions API's
  app.post('/api/transections',(req, res) => {
    const newData = req.body;
    usersCollection.updateOne({ username: req.body.username },{ $push: { transactions: {...newData }}}, (err, result) => {
      res.json(result);
    })
  });

  app.put('/api/transections',(req, res) => {
    const data = req.body;
    const transection_id = new ObjectId(data.transectionID);
    const user_id = new ObjectId(data.userID);
    usersCollection.updateOne({_id: user_id, 'transactions._id': transection_id},{ $set: { 
      'transactions.$.pending_amount': data.pending_amount,
      'transactions.$.payed_amount': data.payed_amount,
      'transactions.$.payment': data.payment
    }}, (err, result) => {
      res.json(result);
    })
  });

  // //other apis
  // app.get('/api/sales', async(req, res) => {
  //   const cursor = salesCollection.find()
  //   const result = await cursor.toArray();
  //   res.json(result.reverse())
  // });

  // app.get('/api/sales/pending', async(req, res) => {
  //   const cursor = salesCollection.find({payment:'pending'})
  //   const result = await cursor.toArray();
  //   res.json(result.reverse())
  // });

  // app.post('/api/sales/pending/date-range', async(req, res) => {
  //   const cursor = salesCollection.find({
  //       payment:'pending',
  //       "created_at": {
  //         $gte: req.body.start,
  //         $lte: req.body.end
  //       }
  //     })
  //     const result = await cursor.toArray();
  //     res.json(result.reverse())
  // });

 

  
  // app.post('/api/sales/search', (req, res) => {
  //   salesCollection.find({ name: "John Smith" }).toArray((err, data) => {
  //       if (err) throw err;
  //       res.json(data);
  //     });
  // });

  // app.post('/api/sales/date-range', async(req, res) => {
  //   const cursor = salesCollection.find({
  //     "created_at": {
  //       $gte: req.body.start,
  //       $lte: req.body.end
  //     }
  //   })
  //   const result = await cursor.toArray();
  //   res.json(result.reverse())
  // });

  //   app.put('/api/sales/pending-payments', async (req, res) =>{
  //   const _id = new ObjectId(req.body._id);
  //   const data = {...req.body.obj}
  //   salesCollection.updateOne({_id: _id}, {$set:{ ...data}}, (err, result) => {
  //     res.json(result);
  //   })
  // })
  // //Debits API's
  // app.post('/api/purchases/date-range', async(req, res) => {
  //   const cursor = purchasesCollection.find({
  //     "created_at": {
  //       $gte: req.body.start,
  //       $lte: req.body.end
  //     }
  //   })
  //   const result = await cursor.toArray();
  //   res.json(result.reverse())
  // });

  // app.get('/api/purchases', async(req, res) => {
  //   const cursor = purchasesCollection.find()
  //   const result = await cursor.toArray();
  //   res.json(result.reverse())
  // });

  // app.get('/api/purchases/pending', async(req, res) => {
  //   const cursor = purchasesCollection.find({payment:'pending'})
  //   const result = await cursor.toArray();
  //   res.json(result.reverse())
  // });

  // app.post('/api/purchases/pending/date-range', async(req, res) => {
  //   const cursor = purchasesCollection.find({
  //       payment:'pending',
  //       "created_at": {
  //         $gte: req.body.start,
  //         $lte: req.body.end
  //       }
  //     })
  //     const result = await cursor.toArray();
  //     res.json(result.reverse())
  // });

  // app.put('/api/purchases/pending-payments', async (req, res) =>{
  //   const _id = new ObjectId(req.body._id);
  //   const data = {...req.body.obj}
  //   purchasesCollection.updateOne({_id: _id}, {$set:{ ...data}}, (err, result) => {
  //     res.json(result);
  //   })
  // })

  // app.post('/api/purchases', (req, res) => {
  //   const newData = req.body;
  //   purchasesCollection.insertOne(newData, async(err, result) => {
  //     await usersCollection.updateOne({ username: req.body.username },{ $push: { transactions: {...newData, trade:'purchase'}}})
  //     res.json(result);
  //   });
  // });

  // app.delete('/api/purchases', (req, res) => {
  //   const newData = req.body;
  //   purchasesCollection.deleteOne(({ name: "John" }), (err, result) => {
  //     if (err) throw err;
  //     res.json(result.ops[0]);
  //   });
  // });

  // app.post('/api/purchases/search', (req, res) => {
  //   purchasesCollection.find({ name: "John Smith" }).toArray((err, data) => {
  //       if (err) throw err;
  //       res.json(data);
  //     });
  // });



  //ExpensesAPI's
  app.get('/api/expenses', async(req, res) => {
    const cursor = expensesCollection.find()
    const result = await cursor.toArray();
    res.json(result.reverse())
  });

  app.post('/api/expenses', (req, res) => {
    const newData = req.body;
    expensesCollection.insertOne(newData, (err, result) => {
      res.json({error: 0, acknowledged: result.acknowledged});
    });
  });

  app.post('/api/expenses/date-range', async(req, res) => {
    const cursor = expensesCollection.find({
        "created_at": {
          $gte: req.body.start,
          $lte: req.body.end
        }
      })
      const result = await cursor.toArray();
      res.json(result.reverse())
  });


 
  //Users Api's
  app.get('/api/users', async(req, res) => {
    const cursor = usersCollection.find()
    const result = await cursor.toArray();
    res.json(result.reverse())
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

  // app.post('/api/users/date-range', async(req, res) => {
  //   const cursor = usersCollection.find({ 'transactions.created_at': {
  //         $gte: ISODate(req.body.start),
  //         $lte: ISODate(req.body.end)
  //       }
  //     })
  //   const result = await cursor.toArray();
  //   res.json(result)
  // });
  // app.put('/api/users/transaction-history', (req, res) => {
  //   const newData = req.body;
  //   usersCollection.update((
  //       { _id: ObjectId("yourObjectId") },
  //       { $push: { transactions: yourData } }
  //   ),(err, result) => {
  //       if (err) throw err;
  //       res.json(result.ops[0]);
  //     })
  // });
  
  // app.post('/api/users/search', (req, res) => {
  //   usersCollection.find({ username: "John Smith" }).toArray((err, data) => {
  //       if (err) throw err;
  //       res.json(data);
  //     });
  // });

 // Start the server
 app.listen(3001, () => {
    mongoose.connect('mongodb://localhost:27017/CurrencyApp', {useUnifiedTopology: true});   
    const database = mongoose.connection;
    database.once('open', () => {
        salesCollection = database.collection('sales');
        purchasesCollection = database.collection('purchases');
        expensesCollection = database.collection('expenses');
        usersCollection = database.collection('users');
        utilitiesCollection = database.collection('utilities');
        console.log('Connected to MongoDB database.');
    });
    database.on('error', (error) => {
        console.error('MongoDB connection error:', error);
    });
});

