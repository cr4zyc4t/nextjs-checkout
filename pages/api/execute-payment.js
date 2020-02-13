import request from 'request'
import { PAYPAL_API, clientId, secret } from './_paypal-credential';

export default async function createPayment(req, res) {
	if (req.method.toUpperCase() !== 'POST') {
		res.statusCode = 404
		res.end()
	}
	// 2. Get the payment ID and the payer ID from the request body.
	const {
		total,
		paymentID,
		payerID,
	} = req.body
	// 3. Call /v1/payments/payment/PAY-XXX/execute to finalize the payment.
	request.post(`${PAYPAL_API}/v1/payments/payment/${paymentID}/execute`,
		{
			auth: {
				user: clientId,
				pass: secret,
			},
			body: {
				payer_id: payerID,
				transactions: [
					{
						amount:
						{
							total: total,
							currency: 'USD',
						},
					}],
			},
			json: true,
		},
		function (err, response) {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
			// 4. Return a success response to the client
			console.log('ToanVQ: createPayment -> response', response.body);
			res.json({
				status: 'success',
				response: response.body,
			});
		});
}
