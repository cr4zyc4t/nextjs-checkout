export const Item = (props) => (
	<div className="item-container">
		<div className="item-image">
			<img src={props.img} />
			<div className="item-details">
				<h3 className="item-name"> {props.name} </h3>
				<h2 className="item-price"> {props.price} </h2>
			</div>
		</div>
	</div>
);

export const Checkout = ({ children }) => (
	<div className="checkout">
		<div className="checkout-container">
			<h3 className="heading-3">Credit card checkout</h3>
			<form autoComplete="off">
				<Input label="Cardholder's Name" type="text" name="name" />
				<Input label="Card Number" type="number" name="card_number" imgSrc="https://seeklogo.com/images/V/visa-logo-6F4057663D-seeklogo.com.png" />
				<div className="row">
					<div className="col">
						<Input label="Expiration Date" type="month" name="exp_date" />
					</div>
					<div className="col">
						<Input label="CVV" type="number" name="cvv" />
					</div>
				</div>
				{children}
			</form>
		</div>
	</div>
);

export const Input = (props) => (
	<div className="input">
		<label>{props.label}</label>
		<div className="input-field">
			<input type={props.type} name={props.name} />
			<img src={props.imgSrc} />
		</div>
	</div>
);

export const Button = (props) => (
	<button className="checkout-btn" type="button">{props.text}</button>
);
