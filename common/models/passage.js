module.exports = function(Passage) {
	Passage.beforeRemote('create', function(context, user, next) {
		var req = context.req;
		req.body.date = Date.now();
		req.body.ownerId = req.accessToken.userId;
		console.log(req.accessToken);
		next();
	})
};
