import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
const navigate=useNavigate();
const [enterUsername,setEnterUsername]=useState("");
const [enterPassword,setEnterPassword]=useState("");
const correctUsername="abc@gmail.com";
const correctPassword="12345";

function loginBtn(){
  if(enterUsername===correctUsername && enterPassword===correctPassword){
    console.log('Login successful');
    navigate("/dashboard",{state:{
     userName:"Abu Uche",
     userEmail:enterUsername
    }});
  }else {
    alert('Login Fail');
  }

}

  return (
    <>
      <main className="calculator">
        <section>
          <h1>Login</h1>

          <div>
            <label>Username</label>
            <input type="text" value={enterUsername} onChange={(event)=>setEnterUsername(event.target.value)}/>
          </div>
            <div>
            <label>Password</label>
            <input type="password" value={enterPassword} onChange={(e)=>setEnterPassword(e.target.value)}/>
          </div>

          <button onClick={loginBtn}>Login</button>

          <p> Username:{correctUsername}</p>
           <p> Password:{correctPassword}</p>
         </section>

           
      </main>
    </>
  );
}

export default Login;
