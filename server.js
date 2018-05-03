var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');
var mongodb = require("mongodb");
const session = require('express-session');
var ObjectID = mongodb.ObjectID;
var sess;
var CONTACTS_COLLECTION = "contacts";
var LOGIN_COLLECTION = "logins";
var LOGIN_DATA = [{username: "lokesh.tijara@rediffmail.com", password: "lokesh123"},
                  {username: "ajay@gmail.com", password: "ajay123"}]
var app = express();
app.use(bodyParser.json());
app.use(session({secret: 'project'}));
// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");
  db.collection(LOGIN_COLLECTION).insert(LOGIN_DATA, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create Login Data");
    } else {
      console.log("Login Table ready");
    }
  });
  // Initialize the app.
  var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
  });
});
function checkTokenValidOrNot(token) {
    var isTokenValidFlag = false
    isTokenValidFlag = jwt.verify(token, "candidateList", function(err, decoded) {
        return err ? false : true;
    });
    return isTokenValidFlag;
}
function checkToken(req, res) {
  if(!req.headers.token) {
     handleError(res, "Please set auth token in header", "Please set auth token in header")
  } else {
     if(checkTokenValidOrNot(req.headers.token)) {
        return true;
     } else {
       handleError(res, "auth token is expire", "auth token is expire")
     }
  }
}
// CONTACTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}
/*  "/api/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

app.get("/api/contacts", function(req, res) {
  if(checkToken(req, res)) {
    db.collection(CONTACTS_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
  }
  
});
app.post("/api/login", function(req, res) {
  sess = req.session;
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.username) {
    handleError(res, "Invalid user input", "Must provide a username.", 400);
  }
  if (!req.body.password) {
    handleError(res, "Invalid user input", "Must provide a password.", 400);
  }

   db.collection(LOGIN_COLLECTION).findOne({"username" : req.body.username, "password" : req.body.password}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      if(!doc) {
        handleError(res, "Invalid user input", "Invalid user input");
      } else {
        var token = jwt.sign({ id: doc._id
            }, "candidateList", {
                expiresIn: 600
            });
      sess.userDetail = {
        username: doc.username,
        token:token
      }
      res.status(201).json({"status": "ok", data: {"token": token},"message":"login successfully"});
      }
      
    }
  });
});
app.post("/api/contacts", function(req, res) {
  var newContact = req.body;
  newContact.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  }
  if(checkToken(req, res)) {
    db.collection(CONTACTS_COLLECTION).insertOne(newContact, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new contact.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
  }
  
});

/*  "/api/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

app.get("/api/contacts/:id", function(req, res) {
  if(checkToken(req, res)) {
    db.collection(CONTACTS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get contact");
    } else {
      res.status(200).json(doc);
    }
  });
  }
  
});

app.put("/api/contacts/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;
  if(checkToken(req, res)) {
    db.collection(CONTACTS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, {$set :updateDoc}, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update contact");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
  }
  
});

app.delete("/api/contacts/:id", function(req, res) {
   if(checkToken(req, res)) {
    db.collection(CONTACTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete contact");
    } else {
      res.status(200).json(req.params.id);
    }
  });
   }
  
});
