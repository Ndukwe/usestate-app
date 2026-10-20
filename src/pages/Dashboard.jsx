
import { useLocation } from "react-router-dom"

export function Dashboard(){
   const location =useLocation();

   const {userName,userEmail}=location.state;

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