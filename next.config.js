require('dotenv').config()

const idProd = process.env.NODE_ENV === "production"

function getNextEnv() {
	const envs = {};
	for (const key in process.env) {
		if (process.env.hasOwnProperty(key)) {
			const value = process.env[key];
			if (key.startsWith("NEXT_APP")) {
				envs[key] = value
			}
		}
	}
	return envs;
}

module.exports = {
	webpack(config, { webpack, defaultLoaders }) {
		config.module.rules.push({
			test: /\.styled\.css$/,
			use: [
				defaultLoaders.babel,
				{
					loader: require("styled-jsx/webpack").loader,
					options: {
						type: "scoped",
					},
				},
			],
		})

		// Ignore all locale files of moment.js
		config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));
		return config;
	},
	env: getNextEnv(),
};