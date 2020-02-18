import Head from 'next/head';
import Nav from '../components/nav';
import 'bootstrap-css-only'
import '../style.css'
import { useEffect } from 'react';

const sandboxClientId = process.env.NEXT_APP_PAYPAL_CLIENT_ID;

export default function App({ Component, pageProps }) {
	useEffect(() => {
		console.log('ToanVQ: App -> pageProps', pageProps);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
				<script src={`https://www.paypal.com/sdk/js?client-id=${sandboxClientId}&disable-funding=credit,card`} />
			</Head>
			<Nav />
			<Component {...pageProps} />
		</div>
	);
}