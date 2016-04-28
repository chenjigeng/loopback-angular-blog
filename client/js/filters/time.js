(function() {
	angular
		.module("app")
		.factory("fullTime",['$moment',function(moment) {
			return function(date) {
				return $moment(date).format('LLL');
			}
		}])
})()