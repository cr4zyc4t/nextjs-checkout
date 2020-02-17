// 1a. Import the SDK package
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { paypalClient } from './_paypal-client';

export default async function createPayment(req, res) {
	if (req.method.toUpperCase() !== 'POST') {
		res.statusCode = 404
		res.end()
	}
	// 2a. Get the order ID from the request body
	const {
		orderID,
		totalAmount,
	} = req.body

	// 3. Call PayPal to get the transaction details
	const request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderID);

	let order;
	try {
		order = await paypalClient().execute(request);
	} catch (err) {

		// 4. Handle any errors from the call
		console.error(err);
		return res.send(500);
	}

	console.log('ToanVQ: createPayment -> order.result.purchase_units', order.result.purchase_units);
	// 5. Validate the transaction details are as expected
	if (order.result.purchase_units[0].amount.value != totalAmount) {
		return res.send(400);
	}

	// 6. Save the transaction in your database
	// await database.saveTransaction(orderID);

	// 7. Return a successful response to the client
	return res.send(200);
}
