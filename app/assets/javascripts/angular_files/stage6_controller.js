app.controller("stage6Ctrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.activity_id = $location.path().split("/")[4];

  $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.activity_id+'/actors.json')
  .success(function(data){
      $scope.actors = data;
  });

  function get_asks(project_id, activity_id) {
    $http.get('/projects/'+project_id+'/activities/'+activity_id+'/asks.json')
    .success(function(data){
      data.forEach(function(ask) {
        get_actor_of_ask(ask);
      });
      $scope.asks = data;
    });
  }

  function get_actor_of_ask(ask) {
    for (var i = 0; $scope.actors[i]; i++) {
      if ( ask.actor_id == $scope.actors[i].id ) {
        ask.actor_name = $scope.actors[i].name;
      }
    }
  }

  get_asks($scope.project_id, $scope.activity_id);

  $scope.add_edit_ask = function(ask) {
    if(ask){
      $scope.current_ask = ask;
      description = ask.description
    }
    else
      $scope.current_ask = {
        title: "",
        description: "",
        execution: false,
        activity_id: $scope.activity_id,
        project_id: $scope.project_id
      };

    $aside.open({
      templateUrl: 'add-ask.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function($scope, $modalInstance) {
        $scope.save = function(e) {
          if (!$scope.current_ask.description) {
            $scope.current_ask.description = description
            return
          }

          save_or_update_ask()
          $modalInstance.dismiss();
          e.stopPropagation();
        }
        $scope.cancel = function(e) {
          $modalInstance.dismiss();
          e.stopPropagation();
          $scope.current_ask.description = description
        };
      }
    });
  }

  var save_or_update_ask = function() {
    $scope.current_ask.ask = {
      title: '&nbsp;',
      description: $scope.current_ask.description,
      execution: $scope.current_ask.execution,
      scheduling: $scope.current_ask.scheduling,
      activity_id: $scope.current_ask.activity_id,
      project_id: $scope.current_ask.project_id,
      actor_id: $scope.current_ask.actor_id
    }
    if($scope.current_ask.id) {
      $http.put('/projects/'+$scope.project_id+'/activities/'+$scope.activity_id+'/asks/'+$scope.current_ask.id, $scope.current_ask)
        .success(function(data){
          get_actor_of_ask($scope.current_ask);
          // alert success or error
        })
    } else {
      $http.post('/projects/'+$scope.project_id+'/activities/'+$scope.activity_id+'/asks', $scope.current_ask)
        .success(function(data){
          get_actor_of_ask($scope.current_ask);
          $scope.current_ask = data;
          // $scope.asks.push(data);
        })
    }
  }

  $scope.delete_ask = function(ask){
    if(confirm('Are you sure you want to delete this ask?')) {
    $http.delete('/projects/'+$scope.project_id+'/activities/'+$scope.activity_id+'/asks/'+ask.id);
    $scope.asks.splice($scope.asks.indexOf(ask),1);
    }
  }
}]);
