import React,{useState} from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";

export default function CategoryCards(props) {
	const { products } = props;
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [currentProductModal, setCurrentProductModal] = useState(null)
	//call CartContext
	const [cart, setCart] = useState([])
	console.log("cart has:",cart)
	const addToCart = (product) => {
		setCart(prevcart => [...prevcart, product])
	}

	const openModal = () => {
		setIsModalOpen(true)
	} 
	const closeModal = () => {
		setIsModalOpen(false)
	}
	return (
		<article className='flex items-center flex-nowrap justify-center mx-20 mb-10 grid grid-cols-3 gap-10'>
			{products &&
				products.map((product) => {
					return (
						<div key={product.id}>
							<ProductCard
								product={product}
								category={product.category_name}
								openModal={openModal}
								setCurrentProductModal={setCurrentProductModal}
							/>
						</div>
					);
				})}
				{products && isModalOpen && <ProductModal isModalOpen={isModalOpen} closeModal={closeModal} 
			product={currentProductModal} addToCart={addToCart}/>}
		</article>
	);
}
