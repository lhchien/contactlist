var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/controllers"));
app.use(bodyParser.json());

app.get('/contactlist', (req, res) => {
  console.log("I received request from client");
  db.contactlist.find((err, docs) => {
    res.json(docs);
  });
});

app.post('/addcontact', (req, res) => {
  console.log(req.body);
  db.contactlist.insert(req.body, (err, doc) => {
    res.json(doc);
  })
});

app.delete('/removecontact/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, (err, doc) => {
    res.json(doc);
  });
});

app.get('/editcontact/:id', (req, res) => {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, (err, doc) => {
    res.json(doc);
  })
});

app.put('/updatecontact/:id', (req, res) => {
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set:{name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
        res.json(doc);
    })
})


app.listen(3000);
console.log("Server running on port 3000");