
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
		EditProfileCtrl.$inject = ['$scope', "$rootScope", "Owner"];
		function EditProfileCtrl($scope, $rootScope, User) {
			$scope.user = User.findById({id: $rootScope.currentUser.id});
		  $scope.submit = submit;
		  function submit() {
		  	console.log($scope.user);
		  	$scope.user.$save();
		  }
		}

