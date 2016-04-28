
	angular
		.module("app")
		.controller("UserController", ["$scope", "$state", 'Guest', "$window",
			function($scope, $state, Guest, $window){

				$scope.name="";
				$scope.password="";
				$scope.users= [];
				$scope.addUser = addUser;
				$scope.removeUser = removeUser;
				getUsers();
				function getUsers() {
					Guest
						.find()
						.$promise
						.then(function(result) {
							$scope.users = result;
						})
				}
				function addUser(name, password) {
					Guest
						.create({
							name: name				
						})
						.$promise
						.then(function(newUser) {
							getUsers();
							$window.alert("success");
							$window.alert(typeof(newUser.passages));
						})
					$window.alert("1111");
				}
				function removeUser() {

				}
			}
		])
		.controller("EditProfileCtrl", EditProfileCtrl);
		EditProfileCtrl.$inject = ['$scope', "$rootScope", "Owner", "Profile", "$state"];
		function EditProfileCtrl($scope, $rootScope, User, Profile, $state) {
			Profile.find({
				filter: {
					where: {
						ownerId: $rootScope.currentUser.id
					}
				}
			})
			.$promise
			.then(function(user) {
				console.log(user);
				console.log(user[0]);
				$scope.user = user[0];
			})
		  $scope.submit = submit;
		  function submit() {
		  	console.log($scope.user);
		  	$scope.user.$save();
		  	$state.go("home");
		  }
		}

