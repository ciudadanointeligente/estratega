app.controller("stage4Ctrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];
  $scope.messages = {response: "", message: ""}

  $http.get('/actors/actor_type.json')
    .success(function(data){
      $scope.actor_types = data
    })
    .error(function (){
      $scope.messages = {response: false, message: "Error while getting actor type information"}
    });

  function get_outcomes(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/outcomes.json')
    .success(function (data) {
      $scope.outcomes = data;
    })
    .error(function (){
      $scope.messages = {response: false, message: "Error while getting outcomes information"}
    });
  }

  function get_outcomes_categories() {
    $http.get('/outcomes/categories.json')
    .success(function (data) {
      $scope.outcomes_categories = data;
    })
    .error(function (){
      $scope.messages = {response: false, message: "Error while getting categories information"}
    });
  }

  get_outcomes($scope.project_id, $scope.objective_id);
  get_outcomes_categories()

  var save_or_update_outcome = function(){
    $scope.current_outcome.title = '&nbsp;';
    if($scope.current_outcome.id) {
      $http.put('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes/'+$scope.current_outcome.id, $scope.current_outcome)
        .success(function (data) {
          // alert success or error
        })
        .error(function (){
          $scope.messages = {response: false, message: "Error while updating the outcome information"}
        });
    } else {
      $http.post('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes', $scope.current_outcome)
        .success(function (data) {
          $scope.current_outcome = data;
          $scope.outcomes.push(data);
        })
        .error(function (){
          $scope.messages = {response: false, message: "Error while creating the outcome information"}
        });
    }
  }

  $scope.add_edit_outcome = function(outcome) {

    var description = "";
    if(outcome){
      $scope.current_outcome = outcome;
      description = outcome.description
    }
    else
      $scope.current_outcome = {title: "", description: "", objective_id: $scope.objective_id};

    $aside.open({
      templateUrl: 'outcome-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function($scope, $modalInstance) {
        $scope.save = function(e) {
          if (!$scope.current_outcome.description) {
            $scope.current_outcome.description = description
            return
          }

          save_or_update_outcome()
          $modalInstance.dismiss();
          e.stopPropagation();
        }
        $scope.cancel = function(e) {
          $scope.current_outcome.description = description
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  }

  $scope.delete_outcome = function(outcome){
    if(confirm('Are you sure you want to delete this outcome?')) {
    $http.delete('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes/'+outcome.id);
    $scope.outcomes.splice($scope.outcomes.indexOf(outcome),1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }
}]);
