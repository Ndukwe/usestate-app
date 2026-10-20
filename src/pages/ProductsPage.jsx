import { useEffect, useState } from "react";
import student from '../data/companyData.js';
import {appProducts} from '../data/products.js';
import ProductCard from '../components/ProductCard.jsx'

function ProductsPage() {
  const [names, setNames] = useState(["Jack", "Peter", "Obi"]);
 
  useEffect(()=>{
   fetch("https://dummyjson.com/quotes").then(
    
   )
  },[]);

  return (
    <>
      <main className="Calculator">
        <section>
          <h1>Students Names {names.length}</h1>

          {names.map((name) => (
            <p>{name}</p>
          ))}
          <hr />
          <div>
            <h2>Object Example Student</h2>
           <p>{student.name}</p> 
            <p>{student.track}</p> 
             <p>{student.bin}</p> 
          </div>
<hr/>

   <h1>Products List</h1>

   { 
   appProducts.products.map((p)=><ProductCard title={p.title} thumbnail={p.thumbnail} price={p.price} 
   description={p.description} category={p.category} />)

   }
          <div>
<hr/>





          </div>
        </section>
      </main>
    </>
  );
}

export default ProductsPage;
