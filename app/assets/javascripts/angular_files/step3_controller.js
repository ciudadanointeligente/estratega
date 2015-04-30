app.controller("step3Ctrl", function($scope, $http){
	$scope.actor = { name:"", description:"", actor_type:"", support: 0, influence: 0 };

	$scope.send_actor_form = function(){
		save_or_update_actor();
		$scope.current_actor = { name:"", description:"", actor_type:"", support: 0, influence: 0 };
	}

	var save_or_update_actor = function(){
		//console.log('save')
		if($scope.current_actor.id) {

		} else {
			$http.post("/actors", $scope.actor)
			.success(function(data){
      	// alertar en caso de success o error
      	console.log(data);
      })
		}
	}
})