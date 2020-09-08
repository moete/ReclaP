const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const port = 3000


const uri = "mongodb+srv://Taz:6TOM8aaIN6kFP3Sl@cluster0.7qbcx.mongodb.net/ReclaP?retryWrites=true&w=majority";

MongoClient.connect(uri, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')
    app.post('/quotes',(req,res)=>{
        quotesCollection.insertOne(req.body)
        .then(result => {
        res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.get('/',(req,res)=>{
        quotesCollection.find().toArray()
        .then(result =>{
            res.render('index.ejs',{quotes:result})
         }).catch(error => console.error(error))
       
    })    
  }).catch(console.error)
  

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.post('quotes',(req,res)=>{
    console.log(req.body)
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
