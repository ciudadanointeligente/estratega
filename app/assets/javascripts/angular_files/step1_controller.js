app.controller("step1Ctrl", ["$scope", "$http", "$location", "$timeout", function($scope, $http, $location, $timeout){
    $scope.current_step = 1;
    $scope.focus_areas = [
        "Poverty and hunger",
        "Universal primary education",
        "Gender equality and empowerment of women",
        "Child mortality",
        "Maternal health",
        "HIV/AIDS, malaria and other diseases",
        "Environmental sustainability",
        "Global partnership"
    ];
    $scope.problem = {title: "", description: "", focus_area: ""};
    $scope.policies = []
    $scope.current_policy = {title: "", description: ""};

    if($location.search().problem_id){
        $http.get('/real_problems/'+$location.search().problem_id+'.json')
        .success(function(data){
            $scope.problem = data;
        })
        $http.get('/real_problems/'+$location.search().problem_id+'/policy_problems.json')
        .success(function(data){
            $scope.policies = data;
        })
    }

    var save_or_update_problem = function(){
        if($scope.problem.title == "")
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
                $location.path("/steps/step1_1").search({problem_id:$scope.problem.id})
                // alertar en caso de success o error
            })
        }
    }

    var save_or_update_policy = function(){
        // if($scope.problem.title == "")
        //     return
        if($scope.current_policy.id){
            $http.put("/real_problems/"+$scope.problem.id+"/policy_problems/"+$scope.current_policy.id, $scope.current_policy)
            .success(function(data){
                // alertar en caso de success o error
            })
        }else{
            $http.post("/real_problems/"+$scope.problem.id+"/policy_problems", $scope.current_policy)
            .success(function(data){
                $scope.policies.push(data);
                // $scope.current_policy = data;
                //agregar el id del policy a la ruta, para edición
                // $location.path("/steps/step1_1").search({problem_id:$scope.problem.id, policy_id:$scope.current_policy.id})
                // alertar en caso de success o error
            })
        }
    }

    var timeoutPromise;
    $scope.$watch("problem", function(new_value, old_value){
        $timeout.cancel(timeoutPromise);
        timeoutPromise = $timeout(function(){
            save_or_update_problem();
        }, 1500);
    }, true);

    $scope.add_policy = function(){
        save_or_update_policy();
        $scope.current_policy = {title: "", description: ""};
    }
    
}]);