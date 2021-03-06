app.controller("stage3Ctrl", ["$scope", "$http", "$aside", "$location", "$attrs", function ($scope, $http, $aside, $location, $attrs) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];
  $scope.current_actor = {name: "", description: "", objective_id: $scope.objective_id};
  $scope.current_environment = {}
  $scope.messages = {response: "", message: ""}

  $http.get('/projects/'+$scope.project_id+'.json')
    .success(function (data) {
      $scope.project = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: $attrs.errorgettingproject }
      scroll_to_top();
    });

  $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id)
    .success(function (data) {
      $scope.objective = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: $attrs.errorgettingobjectives }
      scroll_to_top();
    });

  $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/actors.json')
    .success(function (data) {
      $scope.actors = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: $attrs.errorgettingactors }
      scroll_to_top();
    });

  function get_actor_type() {
    $http.get('/actors/actor_type.json')
      .success(function(data){
        $scope.actor_type = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingactorinfluencelevels }
        scroll_to_top();
      });
  }

  function get_support() {
    $http.get('/actors/actor_support.json')
      .success(function(data){
        $scope.support = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingactorsupports }
        scroll_to_top();
      });
  }

  function get_influence_level() {
    $http.get('/actors/actor_influence_level.json')
      .success(function(data){
        $scope.influence = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingactorinfluencelevels }
        scroll_to_top();
      });
  }

  get_actor_type();
  get_support();
  get_influence_level();

  var save_or_update_actor = function () {
    if($scope.current_actor.id) {
      $http.put("/actors/"+$scope.current_actor.id, $scope.current_actor)
        .success(function (data) {
          // alert success or error
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingactor }
          scroll_to_top();
        });
    } else {
      $http.post("/actors", $scope.current_actor)
        .success(function (data) {
          $scope.current_actor = data;
          $scope.actors.push(data);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingactor }
          scroll_to_top();
        });
    }
  }

  $scope.get_support_name = function (support_id) {
    supports = $scope.support;
    for (var k in supports) {
      if (supports.hasOwnProperty(k)) {
        if ( supports[k] == support_id ) {
          return k;
        }
      }
    }
  }

  $scope.get_influence_name = function (influence_id) {
    influences = $scope.influence;
    for (var k in influences) {
      if (influences.hasOwnProperty(k)) {
        if ( influences[k] == influence_id ) {
          return k;
        }
      }
    }
  }

  $scope.save_or_update_enabling_factor = function (current_enabling_factor, original_enabling_factor) {
    if(original_enabling_factor) {
      var enabling_factor_index = $scope.objective.enabling_factors.indexOf(original_enabling_factor)
      $scope.objective.enabling_factors[enabling_factor_index] = current_enabling_factor;
    } else {
      $scope.objective.enabling_factors.push(current_enabling_factor);
    }
    update_objective();
  }

  $scope.save_or_update_barrier = function (current_barrier, original_barrier) {
    if(original_barrier) {
      var barrier_index = $scope.objective.barriers.indexOf(original_barrier)
      $scope.objective.barriers[barrier_index] = current_barrier;
    } else {
      $scope.objective.barriers.push(current_barrier);
    }
    update_objective();
  }

  var update_objective = function () {
    $http.put('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id, $scope.objective)
      .success(function (data){
        // alert success or error
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorupdatingenablingfactors }
        scroll_to_top();
      });
  }

  $scope.delete_actor = function (actor){
    if(confirm($attrs.confirmdeleteactor)) {
      $http.delete('/actors/'+actor.id);
      $scope.actors.splice($scope.actors.indexOf(actor),1);
    }
  }

  $scope.add_edit_actor = function (actor) {
    if(actor)
      $scope.current_actor = actor;
    else
      $scope.current_actor = {name: "", description: "", objective_id: $scope.objective_id};

    $aside.open({
      templateUrl: 'actor-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_actor();
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

  $scope.add_edit_enabling_factor = function (enabling_factor) {
      if(enabling_factor)
        $scope.current_enabling_factor = enabling_factor;
      else
        $scope.current_enabling_factor = "";

      $aside.open({
        templateUrl: 'enabling-factor-aside.html',
        placement: 'left',
        size: 'lg',
        scope: $scope,
        controller: function ($scope, $modalInstance) {
          $scope.save = function (e) {
            $scope.save_or_update_enabling_factor($scope.current_enabling_factor, enabling_factor);
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

  $scope.add_edit_barrier = function (barrier) {
    if(barrier)
      $scope.current_barrier = barrier;
    else
      $scope.current_barrier = "";

    $aside.open({
      templateUrl: 'barrier-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          $scope.save_or_update_barrier($scope.current_barrier, barrier);
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

  $scope.delete_enabling_factor = function (enabling_factor) {
    if(confirm($attrs.confirmdeleteenablingfactor)) {
      var enabling_factor_index = $scope.objective.enabling_factors.indexOf(enabling_factor);
      $scope.objective.enabling_factors.splice(enabling_factor_index, 1);
      update_objective();
    }
  }

  $scope.delete_barrier = function (barrier) {
    if(confirm($attrs.confirmdeletebarrier)) {
      var barrier_index = $scope.objective.barriers.indexOf(barrier);
      $scope.objective.barriers.splice(barrier_index, 1);
      update_objective();
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }
}]);
