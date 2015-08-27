app.controller("stage5Ctrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {
  $scope.project_id   = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];

  $scope.outcomes    = [];
  $scope.asks = [];
  $scope.activities = [];

  $scope.messages = {response: "", message: ""}

  function get_outcomes(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/outcomes.json')
      .success(function (data){
        $scope.outcomes = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting outcomes information"}
      });
  }

  function get_asks(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/asks.json')
      .success(function (data){
        $scope.asks = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting asks information"}
      });
  }

  function get_activities(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/activities.json')
      .success(function (data) {
        $scope.activities = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting activities information"}
      });
  }

  get_outcomes($scope.project_id, $scope.objective_id);
  get_asks($scope.project_id, $scope.objective_id);
  get_activities($scope.project_id, $scope.objective_id);

  $scope.add_edit_activity = function(activity) {
    if (activity) {
      $scope.current_activity = activity;
    } else
      $scope.current_activity = {
        title: "",
        description: "",
        completion: false,
        scheduling: "",
        objective_id: $scope.objective_id,
        outcome_ids: [],
        ask_ids: []
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
      completion: $scope.current_activity.completion,
      scheduling: $scope.current_activity.scheduling,
      objective_id: $scope.current_activity.objective_id,
      outcome_ids: $scope.current_activity.outcome_ids,
      ask_ids: $scope.current_activity.ask_ids
    }
    if ($scope.current_activity.id) {
      $http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities/' + $scope.current_activity.id, $scope.current_activity)
        .success(function (data) {
          // alert success or error
          get_activities($scope.project_id, $scope.objective_id)
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while updating activity information"}
        });
    } else {
      $http.post('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities', $scope.current_activity)
        .success(function (data) {
          $scope.current_activity = data;
          get_activities($scope.project_id, $scope.objective_id)
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while creating activity information"}
        });
    }
  }

  $scope.delete_activity = function (activity) {
    if (confirm('Are you sure you want to delete this activity?')) {
      $http.delete('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities/' + activity.id);
      $scope.activities.splice($scope.activities.indexOf(activity), 1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }
}]);
