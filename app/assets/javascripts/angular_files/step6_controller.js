app.controller('step6Ctrl', function($scope, $http){
	$scope.asks = [];
	$scope.current_ask = { title: "", description: "" };

	var get_asks = function() {
		$http.get('/activities/1/asks.json')
			.success(function(data){
				$scope.asks = data;
			})
	}

	get_asks();

	$scope.edit_ask = function(ask_id) {
		if(!ask_id || ask_id !== parseInt(ask_id))
			return
		$http.get('/activities/1/asks/'+ask_id+'.json')
			.success(function(data){
				$scope.current_ask = data;
			})
	}
})