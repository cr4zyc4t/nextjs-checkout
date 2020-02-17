import { Item, Checkout } from '../components/checkout-elements';
import React, { useCallback } from 'react';
import CheckoutButton from '../components/PaypalLegacy/CheckoutButton';

const price = parseInt(process.env.NEXT_APP_PRICE, 10) || 15;

export default function PaypalLegacy() {
	const payment = useCallback(function (data, actions) {
		// 2. Make a request to your server
		return actions.request.post('/api/create-payment', {
			total: price,
		})
			.then(function (res) {
				console.log('ToanVQ: PaypalLegacy -> res', res);
				// 3. Return res.id from the response
				return res.id;
			});
	}, []);

	// Execute the payment:
	// 1. Add an onAuthorize callback
	const onAuthorize = useCallback(function (data, actions) {
		console.log('ToanVQ: PaypalLegacy -> data', data);
		// 2. Make a request to your server
		return actions.request.post('/api/execute-payment', {
			paymentID: data.paymentID,
			payerID: data.payerID,
			total: price,
		}).then(function (res) {
			console.log('ToanVQ: PaypalLegacy -> res', res);
			// 3. Show the buyer a confirmation message.
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
							payment={payment}
							onAuthorize={onAuthorize}
							onCancel={console.log}
						/>
					</Checkout>
				</div>
			</div>
		</div>
	)
}