import express from "express";
import pg from "pg"
import bodyParser from "body-parser";
import cors from "cors"
import { configDotenv } from "dotenv";
import { createTransport } from "nodemailer";

const PORT=4000;
const app=express();

const transporter=createTransport({
  service:'gmail',
  auth: {
    user: process.env.MY_GMAIL, // Your email address
    pass: process.env.MY_GMAIL_PASSWORD, // Your email password or app password
  },
})

const db=new pg.Client({
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_DATABASE,
    password: process.env.DATABASE_PASSSWORD,
    port: process.env.DATABASE_PORT,
  });

  db.connect();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use(cors())
app.post("/login",async (req,res)=>{
    let username=req.body.username;
    let pass=req.body.password;
    try
    {
      const result=await db.query("select password from users where username =$1",[username]);
      const data=result.rows[0];
      if(data.password===pass)
      {
        res.json("valid")
      }
      else{
        res.json("wrong password");
      }
    }
    
    catch(err)
    {
      res.json("username not found")
    }
})


app.post('/signup', async (req, res)=>{
  const name=req.body.name;
  const mobile=req.body.mobile;
  const username=req.body.username;
  const password=req.body.password;
  const rooms=req.body.rooms;
  const mail=req.body.mail;
  const buisness=req.body.buisness

  try{
    const result=await db.query("insert into users (name, mobile, username,  password, buisness, mail, rooms) values($1,$2,$3,$4,$5,$6,$7) ",[name, mobile, username, password, buisness, mail, rooms]);
    res.send("submitted")
    const mailOptions = {
      from: 'radhechaudhary6398@gmail.comm', // Sender address
      to: mail, // Recipient address
      subject: 'Automated Email from user-regester', // Subject line
      text: 'Hello!! Thankyou for connecting with us!! Hope the journey will be great!!', // Plain text body
      html: '<p>Hello!!<b>Thankyou for connecting with us</b>Hope the journey will be great!!</p>', // HTML body (optional)
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log('Error occurred:', error);
      }
      console.log('Email sent:', info.response);
    });
  }
  catch(err){
    res.send(err.message)
  }
})

app.post('/data-submit',async(req,res)=>{
  if(req.query.apiKey==="njknj4j43npa@mweoc43"){
    try{
      const result=await db.query("insert into costumers (username, name, mobile, room_no, entry_date, entry_time,  out_date, out_time, members) values($1,$2,$3,$4,$5,$6,$7,$8,$9)",
        [req.body.username, req.body.name, req.body.mobile, req.body.roomNo, req.body.inDate, req.body.inTime, req.body.OutDate, req.body.OutTime, req.body.members]
      )
      res.send(req.body.name)
      
    }
    catch(err){
      res.send(err.message)
    }
  }
  else{
    res.send("not valid")
  }
  

})

app.get("/data", async(req,res)=>{
  if(req.query.apiKey===process.env.API_KEY){
    try{
      const result=await db.query("Select * from costumers where username=$1",[req.query.username])
      res.json(result.rows)
    }
    catch(err){
      res.send(err.message)
    }
  }
  else{
    res.send("not valid")
  }
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})
