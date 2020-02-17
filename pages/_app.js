import Head from 'next/head';
import Nav from '../components/nav';
import 'bootstrap-css-only'
import '../style.css'

export default function App({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
				<script src="https://www.paypalobjects.com/api/checkout.js"></script>
			</Head>
			<Nav />
			<Component {...pageProps} />
		</div>
	);
}