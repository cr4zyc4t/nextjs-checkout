import request from 'request'
import { PAYPAL_API, clientId, secret } from './_paypal-credential';

export default async function createPayment(req, res) {
	if (req.method.toUpperCase() !== 'POST') {
		res.statusCode = 404
		res.end()
	}
	const { total } = req.body

	// 2. Call /v1/payments/payment to set up the payment
	request.post(`${PAYPAL_API}/v1/payments/payment`,
		{
			auth: {
				user: clientId,
				pass: secret,
			},
			body: {
				intent: 'sale',
				payer: {
					payment_method: 'paypal',
				},
				transactions: [
					{
						amount: {
							total: total,
							currency: 'USD',
						},
					},
				],
				redirect_urls: {
					return_url: 'https://example.com',
					cancel_url: 'https://example.com',
				},
			},
			json: true,
		},
		function (err, response) {
			if (err) {
				console.error(err);
				return res.sendStatus(500);
			}
			// 3. Return the payment ID to the client
			res.json({
				id: response.body.id,
			});
		},
	);
}
