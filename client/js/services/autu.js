(function() {
	angular
		.module("app")
		.factory("authService", authSerFun);
	authSerFun.$inject = ["$q", "$rootScope", 'Owner'];
	authSerFun = function($q, $rootScope, User) {
		var service = {
			login: login,
			logout: logout,
			regist: regist
		};
		return service;
		function login(email, password) {
			return User
							.login({emial:emial, password: password})
							.$promise
							.then(function(response) {
								$rootScope.currentUser = {
									id : response.user.id,
									tokenId: response.id,
								  email: email
								}
							})

		}
		function logout() {
			return User
				.logout
				.$promise
				.then(function() {
					$rootScope.currentUser = null;
				})
		}
		function regist(email, password) {
			return User
				.regist({email: email, password: password})
				.$promise
		}
	}

})()