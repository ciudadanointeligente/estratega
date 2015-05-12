app.controller("step4Ctrl", function($scope, $http){
	$scope.outcomes = [];
	$scope.current_outcome = {title: "", description: "", objective_id:0, outcome_type_id: 0, actor_type_id: 0}

	//get all outcomes for a objective
	var get_outcomes = function() {
		$http.get("/objectives/1/outcomes.json")
			.success(function(data){
				$scope.outcomes = data;
			})
	}

	get_outcomes();

	$scope.send_outcome_form = function(){
		$scope.current_outcome.title = "a title";
		$scope.current_outcome.objective_id = 1;
		save_or_update();
		$scope.current_outcome = {title: "", description: "", objective_id:0, outcome_type_id: 0, actor_type_id: 0}
	}

	function save_or_update(){
		if($scope.current_outcome.description == "")
            return
        
        $http.post("/objectives/1/outcomes", $scope.current_outcome)
			.success(function(data){
		      	// alertar en caso de success o error
		      	console.log($scope.outcomes);
		      	$scope.outcomes.push(data);
	  		})
	}
})