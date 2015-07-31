app.controller("stage5Ctrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {
  $scope.project_id   = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];

  $scope.outcomes    = [];
  $scope.activities = [];

  function get_outcomes(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/outcomes.json')
      .success(function (data){
        $scope.outcomes = data;
      })
  }

  function get_activities(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/activities.json')
      .success(function (data) {
        $scope.activities = data;
      });
  }

  get_outcomes($scope.project_id, $scope.objective_id);
  get_activities($scope.project_id, $scope.objective_id);

  $scope.add_edit_activity = function(activity) {
    if (activity) {
      $scope.current_activity = activity;
    } else
      $scope.current_activity = {
        title: "",
        description: "",
        objective_id: $scope.objective_id,
        outcome_ids: []
      };

    $aside.open({
      templateUrl: 'activities-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_activity()
          $modalInstance.dismiss();
          e.stopPropagation();
        }
        $scope.cancel = function (e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  }

  var save_or_update_activity = function() {
    $scope.current_activity.activity = {
      title: $scope.current_activity.title,
      description: $scope.current_activity.description,
      objective_id: $scope.current_activity.objective_id,
      outcome_ids: $scope.current_activity.outcome_ids
    }
    if ($scope.current_activity.id) {
      $http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities/' + $scope.current_activity.id, $scope.current_activity)
        .success(function (data) {
          // alert success or error
          get_activities($scope.project_id, $scope.objective_id)
        });
    } else {
      $http.post('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities', $scope.current_activity)
        .success(function (data) {
          $scope.current_activity = data;
          get_activities($scope.project_id, $scope.objective_id)
        });
    }
  }
}]);
