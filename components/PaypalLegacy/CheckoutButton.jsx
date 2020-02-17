import { useClient, isServer } from '../../utils';
import React from 'react';
import ReactDOM from 'react-dom'

const EmptyComponent = () => null

const PaypalButton = isServer() ? EmptyComponent : window.paypal.Buttons.driver('react', { React, ReactDOM })

export default function CheckoutButton(props) {
	return useClient(
		<PaypalButton
			layout="vertical"
			style={{
				size: 'responsive',
				color: 'blue',
				shape: 'rect',
				label: 'buynow',
				tagline: false,
			}}
			{...props}
		/>,
	)
}