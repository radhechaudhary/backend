import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import icon from './regester icon.png'
import TextField from '@mui/material/TextField';

function SignUp(prop) {
    let Mystyle={display: "flex", flexDirection: "column", gap:"40px"}
    let MyStyle2={width:"fit-content"}

    const [values, setValues]=useState({name:"", mobile:"", username:"", password:"", buisness:"", rooms:"", mail:""});  // hook to store input values
    function handleChange(e){       // function that triggers when any input is triggered
      const name=e.target.name   
      var value=e.target.value
      if(name!=="name"){           // dont allow spaces except name
        value=value.trim();
      }
      setValues({
        ...values,
        [name]:value
      })
    }

    function submit(e){        //submit function when form is submitted
      e.preventDefault();
      const name=values.name.trim()
      setValues({
        ...values,
        name:name
      })
      if(values.username==="" || values.password===""  || values.name==="" || values.mobile==="" || values.buisness==="" || values.rooms==="" || values.mail==="" ){
          alert("A Field cannot be blank")
          setNextpage(1)
        }
      else{
          prop.signUp(values);
      }
  }
  const [nextPage, setNextpage]=useState(1)
  const [loading, setLoading]=useState(false)
  function next(e){
    e.preventDefault()
    setLoading(true)
        setLoading(false)
        setNextpage(nextPage+1) 
  }
  function prev(e){
    e.preventDefault()
    setLoading(true)
    setLoading(false)
    setNextpage(nextPage-1)
  }

  return (
    <div className="sign-up login main-body">
      {
            prop.isLoading?<Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>: <></>}
          <div  className="header">
            <img src={icon} style={{width:"50px", height:"auto"}} alt="add-user-male"/>  
            <h2>Create Your Account</h2>
            <p style={{color:"rgb(140,140, 140)"}}>Start Your Journey With Us!!</p>
          </div>
        <div className='form'>
        <h2 style={{color:"rgb(71, 71, 71)", textAlign:"center"}}>REGESTER!</h2>
        <form >
            <div style={Mystyle}>
                {nextPage===1?<TextField id="outlined-text-input" label="name"value={values.name} onChange={(e)=>handleChange(e)} placeholder="Name"  name="name"/>:<></>}
                {nextPage ===1?<TextField id="outlined-text-input" label="mobile" type="text" value={values.mobile} onChange={(e)=>handleChange(e)} placeholder="mobile" name="mobile"/>:<></>}
                {nextPage ===2?<TextField label="make a username" id="outlined-text-input"type="text" value={values.username} onChange={(e)=>handleChange(e)} placeholder="username" name="username"/>:<></>}
                {nextPage===2?<TextField label="mail" id="outlined-text-input"type="text" value={values.mail} onChange={(e)=>handleChange(e)} placeholder="example: someone@gmailcom" name="mail"/>:<></>}
                {nextPage ===4?<TextField label="chooose a password" id="outlined-password-input" type="password"  value={values.password} onChange={(e)=>handleChange(e)} placeholder="password" name="password"/>:<></>}
                {nextPage===3?<TextField label="your Buisness" id="outlined-text-input" type="text" value={values.buisness} onChange={(e)=>handleChange(e)} placeholder="Buisness Name" name="buisness"/>:<></>}
                {nextPage===3?<TextField label="No of rooms" id="outlined-text-input" type="text" value={values.rooms} onChange={(e)=>handleChange(e)} placeholder="rooms" name="rooms"/>:<></>}
            </div>
            <p className="error">{prop.error}</p>
            <div className="buttons">
            {nextPage>1?<button className="btn btn-primary" onClick={prev} style={MyStyle2}>prev</button>:<div></div>}
            {nextPage<=3?<button className="btn btn-primary" onClick={next} style={MyStyle2}>next</button>:<></>}
            {nextPage===4?<button type="submit" onClick={submit} className="btn btn-primary" style={MyStyle2}>Submit</button>:<></>}
            </div>  
        </form>
        <p>Account already exist? <Link to="/login">Sign In</Link></p>
        </div>
    </div>
  )
}
export default SignUp;
