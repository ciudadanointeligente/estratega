app.directive("solutionsForm", function($http){
    return {
        scope: {
            policy: "=",
            problemId: "="
        },
        restrict: "E",
        templateUrl: "/solutions/aside_form",
        controller: function($scope, $http){
            $scope.solution = {title: "", description: ""}

            console.log($scope.problemId)

            $scope.save_or_update_solution = function(){
                //if
                $http.post("/real_problems/"+$scope.problemId+"/policy_problems/"+$scope.policy.id+"/solutions", $scope.solution)
                .success(function(data){
                    console.log(data)
                })
            }
        }
    }
})