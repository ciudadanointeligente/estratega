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
	$scope.add_edit_ask = function(policy_id, solution_id) {

		$aside.open({
			templateUrl: 'add-ask.html',
			placement: 'left',
			size: 'lg',
			scope: $scope,
			controller: function($scope, $modalInstance) {
				$scope.save = function(e) {
					$modalInstance.dismiss();
                  	e.stopPropagation();
				}
				$scope.cancel = function(e) {
                  $modalInstance.dismiss();
                  e.stopPropagation();
                };
			}
		});
	}
})
