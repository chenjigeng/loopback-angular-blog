var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;
	angular
		.module("app")
		.factory("AuthService", ["$q", "$rootScope", 'Owner', "$window", AuthServices]);
	function AuthServices($q, $rootScope, User, $window) {
		var service = {
			login: login,
			logout: logout,
			regist: regist
		};
		return service;
		function login(email, password) {
			return User
							.login({rememberMe:true, email:email, password: password, ttl: TWO_WEEKS})
							.$promise
							.then(function(response) {
								$rootScope.currentUser = {
									id : response.user.id,
									tokenId: response.id,
								  email: email
								}
								console.log($rootScope.currentUser);
							})

		}
		function logout() {
			return User
				.logout()
				.$promise
				.then(function() {
					$rootScope.currentUser = null;
				})
		}
		function regist(email, password, username) {
			return User
				.create({email: email, password: password, username: username})
				.$promise
		}
	}

