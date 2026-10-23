import {appProducts} from '../data/products.js'
import ProductCard from '../components/ProductCard.jsx'
import {useState,useEffect} from 'react';





export function Products() {
  const [filterProducts,setFilterProduct]=useState('');
  const [filterProductsList,setFilterProductList]=useState([]);
  const [studentName,setStudentName]=useState();
  const [students,setStudents] =useState( [
    { name: "Obi", age: 12 },
    { name: "Mike", age: 13 },
    { name: "Peter", age: 12 },
    { name: "Ken", age: 12 },
  ]);


  const [users, setUsers] = useState([]);
useEffect(() => {
fetch("https://dummyjson.com/quotes")
.then((res) => res.json())
.then((data) => setUsers(data.quotes))
.catch((err) => console.log(err));
}, []); 

  const [products,setProducts]=useState(appProducts.products);
   const searchProducts = appProducts.products.filter((product) =>
    product.title.includes(filterProducts)
  );

  const addNewStudent=()=>{
   const newStudent={name:studentName,age:10};
   setStudents([...students,newStudent])
  }

  
  const studentData = {};
  return (
    <>
      <main className="calculator">
        <section>
          <input type={filterProducts} onChange={((e)=>setFilterProduct(e.target.value))}/>
          
          <h1>Products</h1>
            {searchProducts.map((product, i) => (
           <ProductCard title={product.title} thumbnail={product.thumbnail} />))}
        </section>

          <section>
          <h1>Add A New student{students.length} </h1>
          <div>
            <p>Student Name</p>
            <input type="text" value={studentName} onChange={(e)=>(
              setStudentName(e.target.value)
              
              )}/>
               
              
              
              <button onClick={addNewStudent}>Add</button>
              <p>Show </p>
          </div>
        

          {students.map((product, i) => 
           
           <ProductCard title={product.name}  />

          )}

          <hr/>
          <table>
            <tr>

            <th>Names</th>
             <th>Category</th>
             <th>Image</th>
            </tr>
           
                {
            products.map((pro)=>(
             <tbody>
            <td>{pro.title}</td>
             <td>{pro.category}</td>
              <td><img src={pro.thumbnail}/></td>
           
             </tbody>
          ))
          }


          <hr/>
          <div>
            {
              users.map((u)=>(<p>{u.quote}</p>))
            }
          </div>
            
          
         
         
        
           
        
         </table>
        </section>
      </main>
    </>
  );
}
