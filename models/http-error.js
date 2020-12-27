class HttpError extends Error {
	constructor(message, errorCorde) {
		super(message);
		this.code = errorCorde;
	}
}

module.exports = HttpError;
