import React, { useRef, useState, useEffect } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();

  let options = props.options;
  let priceOptions = Object.keys(options);
  let [qty, setQty] = useState(1)
  let [size, setSize] = useState("")
  const priceRef = useRef();

  // let foodItem = props.foodItems;

  const handleAddToCart = async() => {

    let food = []
    for (const item of data){
      if (item.id === props.foodItem._id){
        food = item;
        break;
      }
    }

    //If only the qty of the order changes
    //And change for only when size
    if (food !== []){
      if (food.size === size){
        await dispatch({type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty})
        return
      }
      else if (food.size !== size){
        await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
        return 
      }
      await dispatch({type:"ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    }
    //console.log(data);
  }

  let finalPrice = qty * parseInt(options[size]);
  
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])


  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "360px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="container w-100">
              {/* Creating a dropdown for quantity*/}
              <select className="m-2 h-100 bg-success rounded" style={{ select: "#FF0000" }} onChange={(e)=>setQty(e.target.value)}>
                {Array.from(Array(6), (e, i) => {
                  return (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  );
                })}
              </select>

              {/* Creating a dropdown for size i.e pizza*/}
              <select className="m-2 h-100 bg-success rounded"  style={{ select: "#FF0000" }} ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                {priceOptions.map((j) => {
                  return (
                    <option key={j} value={j}>
                      {j}
                    </option>
                  );
                })}
              </select>
              <div className="d-inline h-100 fs-5">  ₹{finalPrice}/-</div>
              <hr></hr>
              <button 
                  className="btn btn-success justify-center ms-2"
                  onClick={handleAddToCart}>
                  Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
