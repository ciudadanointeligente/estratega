app.controller("projectResourcesCtrl", function($scope, $http, $location, $timeout, $aside){
    $scope.project_id = $location.path().split("/").pop();
    // $scope.load_models = load_models;
    $scope.itemsByPage=15;

    var load_models = function(){
        console.log("loading models")
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
    }
    load_models();

    $scope.open_form = function(resource){
        // openAside(policy, 'left', true)
        openAside('left', true, resource);
    }

    // var openAside = function(policy, position, backdrop) {
    var openAside = function(position, backdrop, resource) {
      $scope.asideState = {
        open: true,
        position: position
      };

      function postClose() {
        $scope.asideState.open = false;
      }

      // var problem_id = $scope.problem_id;
      var templateUrl = $scope.project.id + '/resources/' + (resource ? resource.id + "/aside" : 'aside')
      $scope.current_resource = resource;

      $aside.open({
        templateUrl: templateUrl,
        scope: $scope,
        placement: position,
        size: 'lg',
        backdrop: backdrop,
        controller: function($scope, $modalInstance, $timeout) {
          // $scope.solution_button_txt = "Add Solution";
          // $scope.policy = policy;
          // $scope.problem_id = problem_id;
          // $scope.project = 
          $scope.add_resource = function(e) {
            $modalInstance.close();
            e.stopPropagation();
            // only so reloading is executed after posting
            // this should be executed as a callback, on form success
            $timeout(load_models, 1);
          };
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