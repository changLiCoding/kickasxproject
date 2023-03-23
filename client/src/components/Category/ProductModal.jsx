import React, { useRef, useEffect, useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import ProductRentCalendar from "./ProductRentCalendar";

export default function ProductModal(props) {
	const ref = useRef(null);
	const cardContainer = useRef(null);
	const { product, isModalOpen, closeModal } = props;
	const { addCart } = useContext(CartContext);

  useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				closeModal();
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [ref]);
  
// <p> with scroll for the description
// sidebar collapse

  return (
    <div id="modal-container" className="custom-modal" >
      
    <div className="card card-compact w-3/5 h-9/12 bg-base-100 shadow-xl" ref={ref} >
      <figure className="bg-white">
        <img className="bg-white object-contain  h-96"
          src={product.image_url}
          alt={product.model}
        />
      </figure>
      <div className="card-body bg-white">
        <h2 className="card-title">{product.model}</h2>
        <p className="overflow-y-auto">{product.description}</p>
        <div></div>
        <div className="card-actions justify-end">
        <div className="badge badge badge-lg">${product.price_in_cents / 100}</div> 
          <button onClick={() => addCart(product)} className="btn btn-primary">Add to Cart</button>
          <label
							htmlFor='calendar'
							className='btn btn-primary'>
							Or Rent
						</label>
						<ProductRentCalendar />
        </div>
        <div className="card-actions justify-start">

          <button onClick={closeModal} className="btn btn-sm">X</button>
        </div>
        </div>
      </div>
    </div>

	);
}
