import Head from 'next/head';
import { Item, Checkout } from '../components/checkout-elements';
import { useEffect } from 'react';
import { StripeProvider } from 'react-stripe-elements';

const price = parseInt(process.env.NEXT_APP_PRICE, 10) || 15;

export default function Strip() {
	useEffect(() => {
	}, [])

	return (
		<StripeProvider apiKey={process.env.NEXT_APP_STRIPE_KEY}>
			<div className="app-container">
				<Head>
					<script src="https://js.stripe.com/v3/"></script>
				</Head>
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
		</StripeProvider>
	)
}