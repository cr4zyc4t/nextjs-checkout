'use strict';

/**
 *
 * PayPal Node JS SDK dependency
 */
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
export function paypalClient() {
	return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {
	const clientId = process.env.NEXT_APP_PAYPAL_CLIENT_ID || 'PAYPAL-SANDBOX-CLIENT-ID';
	const clientSecret = process.env.NEXT_APP_PAYPAL_SECRET || 'PAYPAL-SANDBOX-CLIENT-SECRET';

	return new checkoutNodeJssdk.core.SandboxEnvironment(
		clientId, clientSecret,
	);
}

export async function prettyPrint(jsonData, pre = '') {
	let pretty = '';
	function capitalize(string) {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	}
	for (const key in jsonData) {
		if (jsonData.hasOwnProperty(key)) {
			if (isNaN(key))
				pretty += `${pre + capitalize(key)}: `;
			else
				pretty += `${pre + (parseInt(key) + 1)}: `;
			if (typeof jsonData[key] === 'object') {
				pretty += '\n';
				pretty += await prettyPrint(jsonData[key], `${pre}    `);
			} else {
				pretty += `${jsonData[key]}\n`;
			}

		}
	}
	return pretty;
}
