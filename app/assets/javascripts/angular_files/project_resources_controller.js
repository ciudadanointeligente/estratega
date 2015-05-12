app.controller("projectResourcesCtrl", function($scope, $http, $location, $timeout, $aside){
    $scope.project_id = 1;

    if($scope.project_id){
        $http.get('/projects/'+$scope.project_id+'.json')
        .success(function(data){
            $scope.project = data;
        })
        $http.get('/projects/'+$scope.project_id+'/resources.json')
        .success(function(data){
            $scope.resources = data;
        })
    }
})