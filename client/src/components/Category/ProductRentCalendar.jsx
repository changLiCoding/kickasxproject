import React, { useState, useContext } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import { CartContext } from "../../contexts/CartContext";
import priceConverter from "../../helpers/priceConverter";
import getDaysDifference from "../../helpers/getDayDifference";

export default function ProductRentCalendar({ product }) {
	const [value, setValue] = useState({
		startDate: new Date(),
		endDate: new Date().setMonth(11),
	});
	

	const handleValueChange = (newValue) => {
		if (typeof newValue.startDate === "string") {
			// Convert the startDate string to a Date object
			newValue.startDate = new Date(newValue.startDate);
		}

		if (typeof newValue.endDate === "string") {
			// Convert the endDate string to a Date object
			newValue.endDate = new Date(newValue.endDate);
		}

		setValue(newValue);
	};

	const { setRent } = useContext(CartContext);

	return (
		<>
			<input
				type='checkbox'
				id='calendar'
				className='modal-toggle'
			/>
			<div className='modal'>
				<div className='modal-box w-10/12 max-w-5xl h-4/6'>
					<Datepicker
						placeholder={"Please Click Here"}
						value={value}
						onChange={handleValueChange}
						
					/>
					<div className='modal-action mt-80 flex justify-between'>
						<button
							type='button'
							className='btn btn-secondary'
							onClick={() => {
								setRent(value.startDate, value.endDate, product);
							}}>
							Submit
						</button>
						<span>{value.startDate && value.endDate && priceConverter( getDaysDifference(value.startDate, value.endDate) * product.rent_rate_in_cents)}</span>
						<label
							htmlFor='calendar'
							className='btn'>
							Close
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
