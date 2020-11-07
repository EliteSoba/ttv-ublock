/// twitch-videoad.js
const origFetch = window.fetch;
let newType='site';
setTimeout(() => {newType = "thunderdome"; console.log('changed')}, 5 * 1000);
window.fetch = (url, init, ...args) => {
	if (typeof url === "string") {
		if (url.includes("/access_token")) {
			url = url.replace("player_type=site", `player_type=${newType}`);
		} else if (
			url.includes("/gql") &&
			init &&
			typeof init.body === "string" &&
			init.body.includes("PlaybackAccessToken")
		) {
			const newBody = JSON.parse(init.body);
			newBody.variables.playerType = newType;
			init.body = JSON.stringify(newBody);
		}
	}
	return origFetch(url, init, ...args);
};
