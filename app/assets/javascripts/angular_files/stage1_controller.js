app.controller("stage1Ctrl", function($scope, $http, $aside, $location){
	$scope.btn_problem = "Add";
	$scope.problem = {title: "", description: "", focus_area: ""};
	$scope.problem_id = $location.search().problem_id

	$scope.policies = [];
	$scope.current_policy = {title: "", description: ""};

	if($scope.problem_id) {
		$http.get('/real_problems/'+$scope.problem_id+'.json')
        	.success(function(data){
            	$scope.problem = data;
            	$scope.btn_problem = "Edit";
        	});
        $http.get('/real_problems/'+$scope.problem_id+'/policy_problems.json')
	        .success(function(data){
	            $scope.policies = data;
	        })
	}

	var save_or_update_problem = function(){ 
        if($scope.problem.title == "" || $scope.problem.description == "")
            return

        if($scope.problem.id){
            $http.put("/real_problems/"+$scope.problem.id, $scope.problem)
            .success(function(data){
                // alertar en caso de success o error
            })
        }else{
            $http.post("/real_problems", $scope.problem)
            .success(function(data){
                $scope.problem = data;
                $location.search({problem_id:$scope.problem.id});
                $scope.btn_problem = "Edit";
            })
        }
    };

    var save_or_update_policy = function(){
        if($scope.problem.id == "" || $scope.current_policy.title == "")
            return

        if($scope.current_policy.id){
            $http.put("/real_problems/"+$scope.problem.id+"/policy_problems/"+$scope.current_policy.id, $scope.current_policy)
            .success(function(data){
                // alertar en caso de success o error
                $http.get('/real_problems/'+$scope.problem_id+'/policy_problems.json')
			        .success(function(data){
			            $scope.policies = data;
			            $scope.current_policy = {title: "", description: ""};
			        })
            })
        }else{
            $http.post("/real_problems/"+$scope.problem.id+"/policy_problems", $scope.current_policy)
            .success(function(data){
                $scope.policies.push(data);
            })
        }
    };

	$scope.add_step_one = function() {
		$aside.open({
			templateUrl: 'aside.html',
			placement: 'left',
			size: 'lg',
			scope: $scope,
			controller: function($scope, $modalInstance) {
				$scope.save = function(e) {
					save_or_update_problem();
					$modalInstance.dismiss();
					e.stopPropagation();
				}
				$scope.cancel = function(e) {
                  $modalInstance.dismiss();
                  e.stopPropagation();
                };
			}
		});
	};

	$scope.add_edit_policy = function(current_policy_id='') {
		if(current_policy_id) {
			$http.get("/real_problems/"+$scope.problem.id+"/policy_problems/"+current_policy_id+".json")
				.success(function(data){
					$scope.current_policy = data;
				})
		} else {
			$scope.current_policy = {title: "", description: ""};
		}

		$aside.open({
			templateUrl: 'policy-aside.html',
			placement: 'left',
			size: 'lg',
			scope: $scope,
			controller: function($scope, $modalInstance) {
				$scope.save = function(e) {
					save_or_update_policy();
					$modalInstance.dismiss();
					e.stopPropagation();
				}
				$scope.cancel = function(e) {
                  $modalInstance.dismiss();
                  e.stopPropagation();
                };
			}
		});
	};

	
});