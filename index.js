import express from "express";
import pg from "pg"
import bodyParser from "body-parser";
import cors from "cors"

const PORT=4000;
const app=express();

const db=new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "GuestHouse",
    password: "Radhe@1101",
    port: 5432,
  });

  db.connect();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json())
  app.use(cors())
app.post("/login",async (req,res)=>{
    console.log(req.body)
    let username=req.body.username;
    let pass=req.body.password;
    try
    {
      const result=await db.query("select password from users where username =$1",[username]);
      const data=result.rows[0];
      console.log(data)
      if(data.password==pass)
      {
        res.json("valid")
      }
      else{
        res.json("wrong password");
      }
    }
    
    catch(err)
    {
      console.log(err);
    }
})

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`)
})