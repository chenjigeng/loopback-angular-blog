(function() {
	angular
		.module("app")
		.controller("ShowPageCtrl", ShowPageCtrl)
		.controller("CreatePageCtrl", CreatePageCtrl)
		.controller("RemovePageCtrl", RemovePageCtrl)
		.controller("EditPageCtrl", EditPageCtrl)
		.controller("PageCtrl", PageCtrl)
		.controller("ShowUserPageCtrl", ShowUserPageCtrl);
		PageCtrl.$inject = ['$scope', "Passage", "$window", "Owner", "$rootScope", '$state', "Comment"];
		function PageCtrl($scope, Passage, $window, Owner, $rootScope, $state, Comment) {
			$scope.submitComment = submitComment;
			$scope.deletecom = deletecom;
			getPassage();
			function submitComment() {
				Comment
					.create({
						content: $scope.comment,
						passageId: $rootScope.passId,
						create_time: new Date(),
						ownerId: $rootScope.currentUser.id
					})
					.$promise
					.then(function(comment) {
						getPassage();
						$scope.comment = "";
					})
			}
			function getPassage() {
				Passage
					.find({
						filter: {
							where: {
								id: $rootScope.passId
							},
							include: ['owner', {'comments': 'owner'}]
						}
					})
					.$promise
					.then(function(passage) {
						$scope.passage = passage[0];
						console.log(passage[0].comments);
					})
			}
			function deletecom(id) {
				if ($scope.passage.ownerId == $rootScope.currentUser.id) {
					Comment
						.deleteById({
							id: id
						})
						.$promise
						.then(function() {
							$window.alert("删除成功");
							getPassage();
						})
				}
				else {
					$window.alert("只有文章拥有者可以删除评论");
				}
			}
		}

		ShowUserPageCtrl.$inject = ['$scope', "Passage", "$window", "Owner", "$rootScope", '$state'];
		function ShowUserPageCtrl($scope, Passage, $window, Owner, $rootScope, $state) {
			$scope.passages = [];
			$scope.edit = edit;
			$scope.remove = remove;
			getPassage();
			function getPassage() {
				Passage
					.find({
						filter: {
							where: {
								ownerId: $rootScope.currentUser.id
							},
							include: ['owner', 'comments']
						}
					})
					.$promise
					.then(function(passage) {
						$scope.passages = passage;
					})
			}
			function edit(id) {
				$rootScope.editPassageId = id;															
				$state.go('editPassage');
			}
			function remove(id) {
				$window.alert("111");
				Passage
					.deleteById({id: id})
					.$promise
					.then(function() {
						$state.go("mainpage");
					})
			}
		}
		ShowPageCtrl.$inject = ['$scope', 'Passage', "$window", "Owner", "$rootScope", "$state"];
		function ShowPageCtrl($scope, passage, $window, Owner, $rootScope, $state) {
			$scope.passages = [];
			$scope.login = false;
			$scope.check = check;
			$scope.message = {
			   text: 'hello world!',
			   time: new Date()
			};
			getpassage();
			function check(id) {
				$rootScope.passId = id;
				$state.go("show-passage");
			}
			function getpassage() {
				passage
					.find({
						filter: {
							include: ['owner']
						}
					})
					.$promise
					.then(function(passages) {
						$scope.passages = passages;
						if ($rootScope.currentUser != undefined) {
							$scope.login = true;
						}
					})
			}
		}
		CreatePageCtrl.$inject = ['$scope', 'Passage', "$rootScope", "$state"];
		function CreatePageCtrl($scope, Passage, $rootScope, $state) {
			$scope.title = [];
			$scope.content = [];
			$scope.createPage = createPage;
			check();
			function check() {
				if (!$rootScope.currentUser) {
					$state.go("login");
				}
			}
			function createPage() {
				Passage
					.create({
						title: $scope.title,
						content: $scope.content
					})
					.$promise
					.then(function() {
						$state.go("mainpage");
					})
			}
		}
		RemovePageCtrl.$inject = ["$scope", "Passage", "$stateParams", "$state"];
		function RemovePageCtrl($scope, Passage) {
			remove();
			function remove() {
				Passage
					.deleteById({id: $stateParams.id})
					.$promise
					.then(function() {
						$state.go("mainpage");
					})
			}
		}
		EditPageCtrl.$inject = ["$scope", "Passage", "$stateParams", "$state", "$rootScope", "$window"];
		function EditPageCtrl($scope, Passage, $stateParams, $state, $rootScope, $window) {
			$scope.passage;
			$scope.editpage = editpage;
			$scope.remove = remove;
			getpage();
			function getpage() {
				Passage
					.findById({id: $rootScope.editPassageId})
					.$promise
					.then(function(result) {
						$scope.passage = result;
					})
			}
			function editpage() {
				$scope
					.passage
					.$save()
					.then(function(page) {
						$state.go("mainpage");
					})
			}
			function remove(id) {
				$window.alert("111");
				Passage
					.deleteById({id: id})
					.$promise
					.then(function() {
						$state.go("mainpage");
					})
			}
		}

})();