module.exports = {
  getAccounts(req, res){
    req.collection.find().toArray(function(err, docs){
      if (err) throw Error()
      res.send(docs)
    })
  },
  getAccountById(req, res){
    req.collection.findOne({id: Number(req.params.id)})
    .then(function(result){
      res.send(result)
    })
  },
  createAccount(req, res , next){
    req.collection.insertOne(req.body)
      .then(function(result){
        res.send(result)
      })
      .catch(function(error){
        next('Internel server error')
      })
  },
  updateAccount(req, res){
    req.collection.update({id : Number(req.params.id)}, {$set : req.body}, (error, result) => {
      if (error) throw Error()
      res.send(result)
    })
  },
  deleteAccount(req, res){
    req.collection.remove({ id : Number(req.params.id)})
      .then(function(result){
        res.send(result)
      })
      .catch(function(error){
        next('Internel server error')
      })
  }

}
