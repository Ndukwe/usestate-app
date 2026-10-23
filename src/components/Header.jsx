
import {Link} from 'react-router-dom';
import './header.css'
function Header(){

    return(
        <>
       
        <header  style={{
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          width: "100%",
          padding:"10px",
          justifyContent:"space-between",
          backgroundColor: "aqua",
        }}>
          <h1>Abu Developer</h1>
          <nav style={{margin:"5px"}}>
            <Link to="/">Calculator</Link>
            <Link to="/login">Login</Link>
            <Link to="/products">Products</Link>
             <Link to="/util">Util Page</Link>
             <Link to="/products-page">New Product</Link>
             <Link to="/extend-data">Api Data</Link>
             
            
           
          </nav>
        </header>
        </>
    )
}

export default Header