(function() {
	angular
		.module(app)
		.controller("CreateComCtrl", CreateComCtrl)
		.controller("DeleteComCtrl", DeleteComCtrl)
		.controller("EditComCtrl", EditComCtrl);
	CreateComCtrl.$inject = ['$scope', "Comment"];
})()
