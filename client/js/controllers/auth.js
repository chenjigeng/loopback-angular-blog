(function() {
	'use strict';
	angular
		.module('app')
		.controller('UserRegistCtrl', RegistCtrl)
		.controller("UserLoginCtrl", LoginCtrl)
		.controller("UserLogoutCtrl", LogoutCtrl)
		.controller("ProfileCtrl", ProfileCtrl);
	ProfileCtrl.$inject = ['$scope', "Owner", "$rootScope"];
	function ProfileCtrl($scope, Owner, $rootScope) {
		$scope.User = Owner
						.findById({
							id: $rootScope.currentUser.id
						});
	}
	RegistCtrl.$inject = ["$scope", "AuthService", "$state", "$window", "$rootScope"];
	function RegistCtrl($scope, AuthService, $state, $window, $rootScope) {
		$scope.email = "";
		$scope.password = "";
		$scope.submit = submit;
		check();
		function submit() {
			$window.alert("123");
			AuthService
				.regist($scope.email, $scope.password, $scope.username)
				.then(function() {
					$state.transitionTo("sign-up-success");
				})
		}
		function check() {
			if ($rootScope.currentUser) {
				$state.go("mainpage");
			}
		}
	}
	LogoutCtrl.$inject = ["$scope", "AuthService", "$state", "$rootScope", "$window"];
	function LogoutCtrl($scope, AuthService, $state, $rootScope, $window) {
		AuthService
			.logout()
			.then(function() {
				$rootScope.islogin = false;
				$state.go("login");
			})
	}
	LoginCtrl.$inject = ["$scope", "AuthService", "$state", "$rootScope"];
	function LoginCtrl($scope, AuthService, $state, $rootScope) {
		$scope.email = "";
		$scope.password = "";
		$scope.submit = submit;
		check();
		function submit() {
			AuthService
				.login($scope.email, $scope.password)
				.then(function() {
					$rootScope.islogin = true;
					$state.go("mainpage");
				})
		}
		function check() {
			if ($rootScope.currentUser) {
				$state.go("mainpage");
			}
		}
	}
})();