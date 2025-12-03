const express =require("express");
const {connectToDb,getDb}=require('./db')
const {ObjectId} = require("mongodb")
const app=express();

  app.use(express.json())

// 
//  connect to data base
let db;
 
connectToDb((err)=>{
    if(!err){
     app.listen(3000,()=>{
    console.log("the app lisnting on port 3000")
})

db=getDb(); 

    }
})

// route the api
app.get('/books',(req,res)=>{

    const page=req.query.p ||0
    const bookPerPage=3


   let books=[];
   db.collection('books')
   .find()
   .sort({author:1})
   .skip(page*bookPerPage)
   .limit(bookPerPage)
   .forEach(book=>books.push(book))
   .then(()=>{
    res.status(200).json(books)
   })
   .catch(()=>{
    res.status(500).json({error:'cound not fetch the doucment'})
   })    

})

app.get('/books/:id',(req,res)=>{
    if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .findOne({_id: new ObjectId(req.params.id)})
        .then(doc=>{
            res.status(200).json(doc)

        })
        .catch(err=>{
            res.status(500).json({error:'cound not fetch the document'})
        })
    }else{
        res.status(500).json({error:"not valid doc id"})
    }
})

app.post('/books',(req,res)=>{
    const book=req.body;
    db.collection('books')
    .insertOne(book)
    .then(result=>{
        res.status(201).json(result)
    })
    .catch(err=>{
        res.status(500).json({error:'could not create a new document'})
    })
})

app.delete('/books/:id',(req,res)=>{
        if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .deleteOne({_id: new ObjectId(req.params.id)})
        .then(result=>{
            res.status(200).json(result)

        })
        .catch(err=>{
            res.status(500).json({error:'cound not delete the document'})
        })
    }else{
        res.status(500).json({error:"not valid doc id"})
    }
})
app.patch('/books/:id',(req,res)=>{
    const updates=req.body
        if(ObjectId.isValid(req.params.id)){
        db.collection('books')
        .updateOne({_id: new ObjectId(req.params.id)},{$set: updates})
        .then(result=>{
            res.status(200).json(result)

        })
        .catch(err=>{
            res.status(500).json({error:'cound not update the document'})
        })
    }else{
        res.status(500).json({error:"not valid doc id"})
    }
})