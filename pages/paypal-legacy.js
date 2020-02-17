import { Item, Checkout } from '../components/checkout-elements';
import Head from 'next/head';
import { useEffect } from 'react';

const price = parseInt(process.env.NEXT_APP_PRICE, 10) || 15;
const sandboxClientId = process.env.NEXT_APP_PAYPAL_CLIENT_ID;

export default function PaypalLegacy() {
	useEffect(() => {
		paypal.Button.render({
			// Configure environment
			env: 'sandbox',
			client: {
				sandbox: sandboxClientId,
				production: 'demo_production_client_id',
			},
			// Customize button (optional)
			locale: 'en_US',
			style: {
				size: 'responsive',
				color: 'gold',
				shape: 'pill',
			},

			// Enable Pay Now checkout flow (optional)
			commit: true,

			// Set up the payment:
			// 1. Add a payment callback
			payment: function (data, actions) {
				// 2. Make a request to your server
				return actions.request.post('/api/create-payment', {
					total: price,
				})
					.then(function (res) {
						console.log('ToanVQ: PaypalLegacy -> res', res);
						// 3. Return res.id from the response
						return res.id;
					});
			},
			// Execute the payment:
			// 1. Add an onAuthorize callback
			onAuthorize: function (data, actions) {
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
			},
			onCancel: console.log,
		}, '#paypal_button_contaner');
	}, [])

	return (
		<div className="app-container">
			<div className="row">
				<div className="col">
					<Item name="Instax Mini 90 Neo Classic" price={`$${price}`} img="http://ecx.images-amazon.com/images/I/61%2BABMMN5zL._SL1500_.jpg" />
				</div>
				<div className="col no-gutters" style={{ paddingLeft: 0 }}>
					<Checkout>
						<div id="paypal_button_contaner" />
					</Checkout>
				</div>
			</div>
		</div>
	)
}