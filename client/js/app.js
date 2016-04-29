
angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngMaterial',
     'ngMessages',
     'angularMoment'
     // "material.svgAssetsCache"
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {

    // $momentProvider
    //   .asyncLoading(false)
    //   .scriptUrl('../static/js/moment.min.js');
    $stateProvider
      .state("login", {
        url: '/login',
        templateUrl: "views/login.html",
        controller: "UserLoginCtrl"
      })
      .state("regist", {
        url: "/regist",
        templateUrl: "views/regist.html",
        controller: 'UserRegistCtrl'
      })
      .state("logout", {
        url: "/logout",
        controller: "UserLogoutCtrl"
      })
      .state("mainpage", {
        url: "/mainpage",
        templateUrl: "views/mainpage.html",
        controller: "ShowPageCtrl"
      })
      .state("sign-up-success", {
        url: "/sign-up/success",
        templateUrl: "views/sign-up-success.html"
      })
      .state("home", {
        url: "/home",
        views: {
          "": {
            templateUrl: "views/home.html"
          },
          "passages@home": {
            templateUrl: "views/passages.html",
            controller: "ShowUserPageCtrl"    
          },
          "profile@home": {
            templateUrl: "views/profile.html",
            controller: "ProfileCtrl"
          }      
        },
        authenticate: true
      })
      .state("create-page", {
        url: "/create",
        templateUrl: "views/create-page.html",
        controller: "CreatePageCtrl",
        authenticate: true
      })
      .state("passages", {
        url: '/passages',
        templateUrl: "views/passages.html",
        controller: "ShowUserPageCtrl"
      })
      .state("editPassage", {
        url: "/edit-passage",
        templateUrl: "views/editpassage.html",
        controller: "EditPageCtrl",
        authenticate: true
      })
      .state("show-passage", {
        url: "/show-passage",
        templateUrl: "views/show-passage.html",
        controller: "PageCtrl"
      })
      .state("forbidden", {
        controller: 'ForbidCtrl',
        url: '/forbidden',
        templateUrl: "views/forbidden.html"
      })
      .state("edit-profile", {
        views: {
          "": {
            templateUrl: "views/edit-profile.html",
            controller: "EditProfileCtrl"
          }
        }
      })

    $urlRouterProvider.otherwise('mainpage');
  }])
  .run(['$rootScope', "$state", init])
  .config(function($mdThemingProvider, $httpProvider) {
    $mdThemingProvider.theme("default");
    $httpProvider.interceptors.push(function($q, $location, LoopBackAuth) {
      return {
        responseError: function(rejection) {
        if (rejection.status == 401) {
          //Now clearing the loopback values from client browser for safe logout...
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.nextAfterLogin = $location.path();
          $location.path('/login');
        }
        return $q.reject(rejection);
        }
      };
});
  })
  function init($rootScope, $state) {
    $rootScope.islogin = false;
    $rootScope.$on('$stateChangeStart', function(event, next) {
      if (next.authenticate && !$rootScope.currentUser) {
          event.preventDefault(); //prevent current page from loading
          $state.go('forbidden');
      }
    })

  } 
