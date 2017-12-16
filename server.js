const routes = require('./routes')

const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const mongodb= require('mongodb')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())

let url = 'mongodb://localhost:27017'
let mongo = mongodb.MongoClient

mongo.connect(url, function(err, database) {
  if(err) throw err
  let  accountsDB = database.db('accounts-db')
  let collection = accountsDB.collection('accounts')

  app.use(function(req , res , next){
    req.collection = collection
    next()
  })
  app.get('/accounts', routes.account.getAccounts)
  app.get('/accounts/:id', routes.account.getAccountById)

  app.post('/accounts', routes.account.createAccount)

  app.put('/accounts/:id', routes.account.updateAccount)

  app.delete('/accounts/:id', routes.account.deleteAccount)


})
app.listen(PORT, () => {
  console.log('server is up and running at port: 3000')
})
