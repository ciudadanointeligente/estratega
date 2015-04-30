app.controller("step3Ctrl", function($scope, $http){
	$scope.actors = [];
	$scope.current_actor = { name:"", description:"", actor_type:"", support: 0, influence: 0 };

	var get_actors = function(){
		$http.get('/actors.json')
        	.success(function(data){
            	$scope.actors = data;
        	})
	}
	get_actors();

	$scope.send_actor_form = function(){
		save_or_update_actor();
		$scope.current_actor = { name:"", description:"", actor_type:"", support: 0, influence: 0 };
	}

	var save_or_update_actor = function(){
		//console.log('save')
		if($scope.current_actor.name == "" || $scope.current_actor.actor_type == "" )
            return

		if($scope.current_actor.id) {
			$http.put("/actors/"+$scope.current_actor.id, $scope.current_actor)
			.success(function(data){
		      	// alertar en caso de success o error
		      	// console.log(data);
		      	get_actors();
      		})
		} else {
			console.log($scope.current_actor);
			$http.post("/actors", $scope.current_actor)
			.success(function(data){
		      	// alertar en caso de success o error
		      	// console.log(data);
		      	$scope.actors.push(data);
      		})
		}
	}

	$scope.edit_actor = function(actor_id){
		$http.get("/actors/"+actor_id+".json")
			.success(function(data){
		      	// alertar en caso de success o error
		      	//console.log(data);
				$scope.current_actor = data;
      		})
	}
})