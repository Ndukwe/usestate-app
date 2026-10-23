
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../data/constant";
function UtilPage() {
  // Store users from the API
  const [posts, setPosts] = useState([]);
  const [dogs,setDogs]=useState();
const [search,setSearch]=useState("");
  // Store loading status
  const [loading, setLoading] = useState(true);

  

  useEffect(()=>{
   axios.get(`${BASE_URL}/posts`)
   .then((res)=>{setPosts(res.data)})
   .catch((error)=>console.log(`Error ${error}`));
   console.log('useEffect running');
   //another API
   axios.get(`https://dog.ceo/api/breeds/image/random`)
   .then((res)=>{setDogs(res.data)})
   .then((error)=>{console.log(error)});
  },[search]);

  return (
  <>
   <div>
    <h2>Data from API{search}</h2>

    <section>
      show random dog
      <img src={dogs.message}/>
    </section>
    <section>
<input type="text" value={search} onChange={(e)=>setSearch(e.target.value)}/>

{
posts.map((post,i)=>(
  <div key={i}>
     <p>{post.title}</p>
  </div>

))

}

    </section>
   </div>
  </>
  );
}

export default UtilPage;
