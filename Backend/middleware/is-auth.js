const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
	const token = req.get('Authorization');
	let decodedToken;
	try {
		decodedToken = jwt.verify(
			token,
			'thesupperlongtokenthatimgonnaforgetinnotimelove'
		);
	} catch (error) {
		error.httpcode = 500;
		throw error;
	}
	if (!decodedToken) {
		const error = new Error('Not authenticated');
		error.httpcode = 401;
		throw error;
	}
	if (decodedToken.isAdmin === true) {
		next();
	} else {
		throw new Error('not a admin');
	}
};

module.exports = auth;
