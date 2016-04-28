var TWO_WEEKS = 60 * 60 * 24 * 7 * 2;
	angular
		.module("app")
		.factory("AuthService", ["$q", "$rootScope", 'Owner', "$window", "Profile","$location",AuthServices]);
	function AuthServices($q, $rootScope, User, $window, Profile, $location) {
		var service = {
			login: login,
			logout: logout,
			regist: regist
		};
		return service;
		function login(email, password) {
			return User
							.login({rememberMe:true, email:email, password: password, ttl: TWO_WEEKS}, function() {
								var next = $location.nextAfterLogin || '/';
 								$location.nextAfterLogin = null;
  								$location.path(next);
							})
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
				.create({email: email, password: password})
				.$promise
				.then(function(data) {
					console.log(data);
					Profile
						.create({
						username: username,
						ownerId: data.id
						})
						.$promise
						.then(function(data) {
							console.log(data);
						});
					});
		}
	}

