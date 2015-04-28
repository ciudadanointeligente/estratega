app.directive("solutionsForm", function($http){
    return {
        // scope: {
        //     policy: "=",
        //     problemId: "=", 
        //     solutions : "@"
        // },
        restrict: "E",
        templateUrl: "/solutions/aside_form",
        controller: function($scope, $http){
            // $scope.solutions = [];
            $http.get("/real_problems/"+$scope.problem_id+"/policy_problems/"+$scope.policy.id+"/solutions.json")
            .success(function(data){
                $scope.solutions = data;
            })
            $scope.current_solution = {title: "", description: ""};

            $scope.save_or_update_solution = function(){
                //if
                $http.post("/real_problems/"+$scope.problem_id+"/policy_problems/"+$scope.policy.id+"/solutions", $scope.current_solution)
                .success(function(data){
                    $scope.solutions.push(data)
                })
                $scope.current_solution = {title: "", description: ""};
            }
        }
    }
});

app.directive("solutionsList", function($http){
    return {
        scope: {
            problemId: "=",
            policy: "="
        },
        restrict: "E",
        templateUrl: "/solutions/list",
        controller: function($scope, $http){
            $scope.solutions = [];
            $http.get("/real_problems/"+$scope.problemId+"/policy_problems/"+$scope.policy.id+"/solutions.json")
            .success(function(data){
                $scope.solutions = data;
            })
            $scope.current_solution = {title: "", description: ""};
        }
    }
});