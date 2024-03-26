export const loadState = <T>(key: string): T | undefined => {
	try {
		const JSONState = localStorage.getItem(key);
		if (!JSONState) {
			return undefined;
		}

		return JSON.parse(JSONState);
	} catch(e) {
		console.error(e);
		return undefined;
	}
};

export const saveState = <T>(key: string, state: T) => {
	const stringJSONState = JSON.stringify(state);
	localStorage.setItem(key, stringJSONState);
};