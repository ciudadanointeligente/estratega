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

    $scope.add_resource = function(){
        console.log("adding resource");
        // openAside(policy, 'left', true)
        openAside('left', true)
    }

    // var openAside = function(policy, position, backdrop) {
    var openAside = function(position, backdrop) {
      $scope.asideState = {
        open: true,
        position: position
      };

      function postClose() {
        $scope.asideState.open = false;
      }

      // var problem_id = $scope.problem_id;

      $aside.open({
        templateUrl: $scope.project.id + '/resources/aside',
        placement: position,
        size: 'lg',
        backdrop: backdrop,
        controller: function($scope, $modalInstance) {
          // $scope.solution_button_txt = "Add Solution";
          // $scope.policy = policy;
          // $scope.problem_id = problem_id;
          // $scope.project = 
          $scope.ok = function(e) {
            $modalInstance.close();
            e.stopPropagation();
          };
          $scope.cancel = function(e) {
            $modalInstance.dismiss();
            e.stopPropagation();
          };
        }
      }).result.then(postClose, postClose);
    }
})