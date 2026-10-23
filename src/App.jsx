
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Header from './components/Header.jsx';
import {Routes,Route} from 'react-router-dom';
import {Dashboard} from './pages/Dashboard.jsx'
import {Products} from './pages/Products.jsx'
import ProductsPage from './pages/ProductsPage.jsx'
import UtilPage from './pages/Utilpage.jsx'
import ExtendData from './pages/ExtendDataPage.jsx'
import AddProducts from './pages/AddProducts.jsx'


function App() {
 

  


  return (
    <>
    <Header/>
    <Routes>
    
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
     <Route path="/dashboard" element={<Dashboard/>}/>
     <Route path="/products" element={<Products/>}/>
       <Route path="/products-page" element={<ProductsPage/>}/>
        <Route path="/util" element={<UtilPage/>}/>
         <Route path="/extend-data" element={<ExtendData/>}/>
          <Route path="/add-product" element={<AddProducts/>}/>

    
    </Routes>
    </>
  );
}

export default App;
