const express = require("express");
const { connectToDb, getDb } = require('./db');
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

let db;

// Export app for modularity/testing
module.exports = app;

// Connect to database and start server if executed directly
if (require.main === module) {
  connectToDb((err) => {
    if (!err) {
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`The app is listening on port ${PORT}`);
      });
      db = getDb();
    } else {
      console.error("Failed to connect to DB:", err);
    }
  });
} else {
  // When imported as a module, set up helper to retrieve DB instance
  app.use((req, res, next) => {
    if (!db) db = getDb();
    next();
  });
}

// Routes
app.get('/books', (req, res) => {
  const page = req.query.p || 0;
  const bookPerPage = 3;

  if (!db) db = getDb();
  if (!db) {
    return res.status(500).json({ error: 'Database connection not initialized' });
  }

  let books = [];
  db.collection('books')
    .find()
    .sort({ author: 1 })
    .skip(page * bookPerPage)
    .limit(bookPerPage)
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books);
    })
    .catch(() => {
      res.status(500).json({ error: 'cound not fetch the doucment' });
    });
});

app.get('/books/:id', (req, res) => {
  if (!db) db = getDb();
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({ error: 'cound not fetch the document' });
      });
  } else {
    res.status(500).json({ error: "not valid doc id" });
  }
});

app.post('/books', (req, res) => {
  if (!db) db = getDb();
  const book = req.body;
  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      res.status(500).json({ error: 'could not create a new document' });
    });
});

app.delete('/books/:id', (req, res) => {
  if (!db) db = getDb();
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: 'cound not delete the document' });
      });
  } else {
    res.status(500).json({ error: "not valid doc id" });
  }
});

app.patch('/books/:id', (req, res) => {
  if (!db) db = getDb();
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: updates })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        res.status(500).json({ error: 'cound not update the document' });
      });
  } else {
    res.status(500).json({ error: "not valid doc id" });
  }
});
