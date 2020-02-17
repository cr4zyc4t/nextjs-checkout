import Head from 'next/head';
import Nav from '../components/nav';
import 'bootstrap-css-only'
import '../style.css'

const sandboxClientId = process.env.NEXT_APP_PAYPAL_CLIENT_ID;

export default function App({ Component, pageProps }) {
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