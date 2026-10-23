
import { useLocation } from "react-router-dom"

export function Dashboard(){
   const location =useLocation();

  // const {userName,userEmail}=location.state;
  const userName=localStorage.getItem("userName");
  const userEmail=localStorage.getItem("userEmail");

    return(
        <>
        
        <main className="calculator">
        <section>
          <h1>Welcome {userName} to Dashboard your email {userEmail} </h1>
         
         
         </section>

           
      </main>
        
        </>
    )
}