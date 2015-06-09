app.controller("projectResourcesCtrl", function($scope, $http, $location, $timeout, $aside){
    $scope.project_id = $location.path().split("/")[2];
    $scope.itemsByPage=15;

    var load_models = function(){
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
        openAside('left', true, resource);
    }

    $scope.delete_resource = function(resource){
      if(confirm('Are you absolutely sure you want to delete?')) {
        $http.delete('/projects/'+$scope.project_id+'/resources/'+resource.id);
        $scope.resources.splice($scope.resources.indexOf(resource),1);
      }
    }

    var openAside = function(position, backdrop, resource) {
      $scope.asideState = {
        open: true,
        position: position
      };

      function postClose() {
        $scope.asideState.open = false;
      }

      var templateUrl = $scope.project_id + '/resources/' + (resource ? resource.id + "/aside" : 'aside')
      $scope.current_resource = resource;

      $aside.open({
        templateUrl: templateUrl,
        scope: $scope,
        placement: position,
        size: 'lg',
        backdrop: backdrop,
        controller: function($scope, $modalInstance, $timeout) {
          $scope.add_resource = function(e) {
            $modalInstance.close();
            e.stopPropagation();
            // only so reloading is executed after posting
            // this should be executed as a callback, on form success
            $timeout(load_models, 1);
          };
          $scope.cancel = function(e) {
            $modalInstance.dismiss();
            e.stopPropagation();
          };
        }
      }).result.then(postClose, postClose);
    }
})