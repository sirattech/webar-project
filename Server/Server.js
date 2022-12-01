const express = require("express");
const multer = require("multer");
// const app = express()
// const bodyParser = require('body-parser');
var fs = require('fs');
const app = express()
const cors = require('cors')
const path = require('path');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
// const Router = require("./routes")
// app.use(bodyParser.urlencoded({ extended: false }))
const jwt = require("jsonwebtoken");
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());




// ...........................database Connect .......................//
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://M_Bilal:bilal456%21%40@cluster0.1bdssl1.mongodb.net/?retryWrites=true&w=majority";
var filetoupload
MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});


// ...........................HomePage Data Upload ........................//
app.post("/data", (req, res) => {
  let webardata = req.body
  console.log("webardata", webardata);
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = {webardata, filetoupload};
    dbo.collection("webardata").insertOne(myobj, function (err, res) {
      console.log("result", res);
      if (err) throw err;
      db.close();
    });
  })
  res.send({status:"ok", data: webardata})
})

// ................................Video Upload .............................//
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    filetoupload = Date.now() + '-' + file.originalname
    cb(null, filetoupload)
  }
})

var upload = multer({ storage: storage }).single('file')
app.post("/upload", (req, res) => {
  // res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Type', 'text/html');
  console.log(res.body);
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      return res.status(500).json(err)
    }
    // return res.status(200).send(req.file)
    res.send(
      {
      file: `/${req.file.originalname}`
    }
    )
  })
  // res.status(200).send({status: true, file: res.body})
})
app.get("/", (req, res)=>{
  try {
      res.status(200).send("server 🏃🏻‍♂️ good")
  } catch (error) {
      console.error("error while get method", error);
  }
});
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.get("/datas", (req, res) => {
  res.status(200).send("api running ")
})



// ...........................signup page ...............................//
var sCode;
app.post("/register", async (req, res) => {
  let parcel = req.body
  console.log("parcel", parcel);
  let alreadyEmail = parcel.email
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = parcel;
    var query = { email: alreadyEmail };
    dbo.collection("customers").find(query).toArray( async(err, result)=> {
    console.log("resultreg", result.length);
      if (err) throw err;
      if (result.length) {
        res.send("Duplicate");
      } else {
       await  dbo.collection("customers").insertOne(myobj, (err, res)=> {
          if (err) throw err;
          db.close();
        });
        res.send("data successfully enter");
        // sCode = "200";
      }
    });
  });

    // if (sCode == "200") {
    //   res.send("Duplicate");
    // } else if (sCode == "200") {
      
    //   res.send("data successfully enter");
    // }
  // else {
  //   res.statusMessage
  // }
})


//...........................Login Page .................................//
var Lcode;
// var Id;
app.post("/login-data", async (req, res) => {
  try{
    let loginEmail = req.body.email
    let loginPassword = req.body.password

    MongoClient.connect(url, async (err, db) => {
      if (err) throw err;
      var dbo = db.db("mydb");
      var userinfo = await dbo.collection("customers").findOne({ email: loginEmail })
     let Id = userinfo._id;
      let fname = userinfo.firstName;
      let lname = userinfo.lastName;
      let email = userinfo.email;
      let obj = {IdAddress :Id ,FistName: fname, LastName: lname, EmailAddress: email}

      if (!userinfo) { return res.json({ error: "Email not match" }); }
      console.log("userinfo", userinfo);
      if (loginPassword === userinfo.password) {
        res.send({ status:"Login Successfully", loginInfo: obj})
      } else {
        res.send("password Incorrect")
      }
    });
  } catch(e){
    console.log("e", e);
  }
  





  // await bcrypt.compare(loginPassword, userinfo.password, function(err, res) {
  // console.log("res",res);
  // if (err){
  //    res.send({ status: "error", error: "InvAlid Password" });
  // }
  // if (res == true) {
  //    res.send({ token: jwt.sign({ email: userinfo.email }, 'RESTFULAPIs') });
  // } else {

  //   console.log("passwords do not match");

  // }






  //  const validPassword = await bcrypt.compare(loginPassword, userinfo.password);
  //  console.log("validPassword", validPassword);
  // if (!validPassword) return res.status(400).send('Invalid Email or Password.')

  // const token = userinfo.generateAuthToken();
  // console.log("token", token);
  // res.send(token);

  //  if(await bcrypt.compare(req.body.password, userinfo.password)){
  //   console.log("bcrypt", bcrypt.compare(req.body.password, userinfo.password));
  //   const token = jwt.sign({ email: userinfo.email }, JWT_SECRET);
  //      console.log("token", token);
  //   if (res.status(201)) {
  //     res.send({status: "ok", data: token })
  //   } else {
  //     return res.json({ error: "error" });
  //   }
  //  }
  // })

  //  return res.json({ status: "error", error: "InvAlid Password" });
  //   if(Lcode == "200"){
  //     res.send("ok")
  //   } else if(Lcode == "400"){
  //     res.send("User Not found")
  //   }else{
  //     res.statusMessage
  //    }

})

const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
