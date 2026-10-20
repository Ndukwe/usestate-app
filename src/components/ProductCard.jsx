
import './product.css'
function ProductCard(props){

    return(
        <>
     <div className="container">  <div className="product-container"  >
      <div className="product-card" >
        <img
          src={props.thumbnail}
          alt="Wireless Headphones"
        />

        <div className="product-info">
          <h3>{props.title}</h3>

          <p className="description">
            {props.description}
          </p>

          <p className="price">₦{props.price}</p>

          <p className="category">{props.category}</p>
        </div>
      </div>
    </div></div>
        
        
        </>
    )

}
export default ProductCard