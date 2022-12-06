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
const { async } = require("@firebase/util");
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

let dataget;
// ...........................HomePage Data Upload ........................//
app.post("/data", (req, res) => {
  let webardata = req.body
  let myobj = {webardata, filetoupload, dataget};
  // console.log("webardata", webardata);
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    ;
    dbo.collection("webardata").insertOne(myobj, function (err, res) {
      // console.log("result", res);
      if (err) throw err;
      db.close();
    });
    console.log("myobj", myobj);
  })
  res.send(myobj)
  // console.log("myobj", myobj);
})

app.get("/getdata", async(req,res)=>{
  let data
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    // var myobj = {webardata, filetoupload, dataget};
    data = await dbo.collection("webardata").find({})
    .toArray(function(err, result) {
      if (err) throw err;
      // console.log(result);
      res.send(result)
      db.close();
    });
  }) 


})
// ................................Video Upload .............................//
// var storage = multer.diskStorage({

//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     filetoupload = Date.now() + '-' + file.originalname
//     cb(null, filetoupload)
//   }
// })

// var upload = multer({ storage: storage }).single('file')
// app.post("/upload", (req, res) => {
  
//   res.setHeader('Content-Type', 'text/html');
  
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json(err)
//     } else if (err) {
//       return res.status(500).json(err)
//     }
   
//     res.send(
//       {
//       file: `/${req.file.originalname}`
//     }
//     )
//   })
  
// })

const upload = multer({
  storage: multer.diskStorage({
      destination: function(req,res,cb){
          cb(null, "uploads")
      },
      filename: function(req,file,cb){
        filetoupload = file.fieldname + "-" + Date.now() + ".mp4"
          cb(null,filetoupload)
      }
  })
}).single("file")

app.post("/upload",upload, (req,res)=>{
  // console.log(req.file);

  res.send(req.file)
} )



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

app.post("/register", async (req, res) => {
  let parcel = req.body
  // console.log("parcel", parcel);
  let alreadyEmail = parcel.email
  MongoClient.connect(url, async (err, db) => {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = parcel;
    var query = { email: alreadyEmail };
    dbo.collection("customers").find(query).toArray( async(err, result)=> {
    // console.log("resultreg", result.length);
      if (err) throw err;
      if (result.length) {
        res.send("Duplicate");
      } else {
       await  dbo.collection("customers").insertOne(myobj, (err, res)=> {
          if (err) throw err;
          db.close();
        });
        res.send("data successfully enter");
      }
    });
  });
})


//...........................Login Page .................................//

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
      // console.log("userinfo", userinfo);
      if (loginPassword === userinfo.password) {
        res.send({ status:"Login Successfully", loginInfo: obj})
      } else {
        res.send("password Incorrect")
      }
    });
  } catch(e){
    console.log("e", e);
  }
  
})



//...................................mind File Upload .......................//


const mindUpload = multer({
  storage: multer.diskStorage({
      destination: function(req,res,cb){
          cb(null, "mind")
      },
      filename: function(req,file,cb){
          dataget = file.fieldname + "-" + Date.now() + ".mind"
          cb(null,dataget)
      }
  })
}).single("mind")

app.post("/mindfile",mindUpload, async(req,res)=>{
 
  res.send(req.file);
})
app.use('/mind', express.static(path.join(__dirname, '/mind')));




const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server Running at ${port}`)
});
