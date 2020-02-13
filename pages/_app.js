import Head from 'next/head';
import Nav from '../components/nav';

export default function App({ Component, pageProps }) {
	return (
		<div>
			<Head>
				<title>Home</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Nav />
			<Component {...pageProps} />
		</div>
	);
}