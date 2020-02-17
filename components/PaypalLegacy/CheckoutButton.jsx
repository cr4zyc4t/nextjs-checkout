import { useClient, isServer } from '../../utils';
import React from 'react';
import ReactDOM from 'react-dom'

const PaypalButton = isServer() ? null : window.paypal.Button.driver('react', { React, ReactDOM })
const sandboxClientId = process.env.NEXT_APP_PAYPAL_CLIENT_ID;

export default function CheckoutButton(props) {
	return useClient(
		<PaypalButton
			env="sandbox"
			client={{
				sandbox: sandboxClientId,
				production: 'demo_production_client_id',
			}}
			locale="en_US"
			style={{
				size: 'responsive',
				color: 'blue',
				shape: 'rect',
				tagline: false,
			}}
			{...props}
		/>,
	)
}