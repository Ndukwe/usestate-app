
import {Link} from 'react-router-dom'
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
          <nav>
            <Link to="/">Calculator</Link>
            <Link to="/login">Login</Link>
            <Link to="/products">Products</Link>
             <Link to="/util">Util Page</Link>
             <Link to="/products-page">New Product</Link>
            
           
          </nav>
        </header>
        </>
    )
}

export default Header