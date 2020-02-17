import { Item, Checkout } from '../components/checkout-elements';
import React, { useCallback } from 'react';
import CheckoutButton from '../components/PaypalLegacy/CheckoutButton';

const price = parseInt(process.env.NEXT_APP_PRICE, 10) || 15;

export default function PaypalLegacy() {
	const createOrder = useCallback(function (data, actions) {
		return actions.order.create({
			purchase_units: [{
				amount: {
					value: price,
					currency_code: 'USD',
				},
			}],
		});
	}, []);

	// Execute the payment:
	// 1. Add an onAuthorize callback
	const onApprove = useCallback(function (data, actions) {
		// // 2. Make a request to your server
		// return actions.request.post('/api/execute-payment', {
		// 	paymentID: data.paymentID,
		// 	payerID: data.payerID,
		// 	total: price,
		// }).then(function (res) {
		// 	// 3. Show the buyer a confirmation message.
		// });

		return actions.order.capture().then(function (details) {
			// Call your server to save the transaction
			return fetch('/api/paypal-transaction-complete', {
				method: 'post',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify({
					orderID: data.orderID,
					totalAmount: price,
				}),
			}).then(res => {
				console.log('ToanVQ: onApprove -> res', res);
				alert(`Transaction completed by ${details.payer.name.given_name}`);
			});
		});
	}, [])

	return (
		<div className="app-container">
			<div className="row">
				<div className="col">
					<Item name="Instax Mini 90 Neo Classic" price={`$${price}`} img="/img/61+ABMMN5zL._SL1500_.jpg" />
				</div>
				<div className="col no-gutters" style={{ paddingLeft: 0 }}>
					<Checkout>
						<CheckoutButton
							createOrder={createOrder}
							onApprove={onApprove}
							onCancel={console.log}
						/>
					</Checkout>
				</div>
			</div>
		</div>
	)
}