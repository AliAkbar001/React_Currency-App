import axios from "axios";
import { useState } from "react";
import { url_path } from "views/constants";
import './style.css'
import { Redirect } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState(0)
  const [navigate, setNavigate] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`${url_path}/login`, {email, password}).then(response => {
      if(response.data.authentication){
        setMsg(1)
        setTimeout(() => {
          setNavigate(true);
        }, 2000);
      }else{
        setMsg(2)
      }
    })
  };

  return (
    <div className="login-form">
      {navigate && <Redirect from='/login' to='/admin/dashboard' />}
    <form onSubmit={handleSubmit}>
      <h1>Login</h1>
      {msg === 2 && 
        <div style={{width:'100%', fontSize:'medium', color:'rgb(143, 13, 4)', background:'rgb(242, 127, 119)', height:'40px', padding:'0.5rem', marginTop:'1rem'}}>
          Invalid email or password
        </div>
      }
      {msg === 1 && 
        <div style={{width:'100%', fontSize:'medium', color:'rgb(3, 110, 53)', background:'rgb(81, 224, 148)', height:'40px', padding:'0.5rem', marginTop:'1rem'}}>
          Login Successfully
        </div>
      }
      <div className="content">
        <div className="input-field">
          <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Email" autocomplete="nope"/>
        </div>
        <div className="input-field">
          <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" autocomplete="new-password"/>
        </div>
      </div>
      <div className="action">
        <button>Sign in</button>
      </div>
    </form>
  </div>
  );
}

export default SignIn;
