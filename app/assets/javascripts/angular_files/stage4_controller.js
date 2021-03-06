app.controller("stage4Ctrl", ["$scope", "$http", "$aside", "$location", "$attrs",  function ($scope, $http, $aside, $location, $attrs) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];
  $scope.messages = {response: "", message: ""}

  $http.get('/actors/actor_type.json')
    .success(function(data){
      $scope.actor_types = data
    })
    .error(function (){
      $scope.messages = {response: false, message: $attrs.errorgettingactortype }
      scroll_to_top();
    });

  function get_outcomes(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/outcomes.json')
    .success(function (data) {
      $scope.outcomes = data;
      init_dnd_list();
    })
    .error(function (){
      $scope.messages = {response: false, message: $attrs.errorgettingoutcomes }
      scroll_to_top();
    });
  }

  function get_outcomes_categories() {
    $http.get('/outcomes/categories.json')
    .success(function (data) {
      $scope.outcomes_categories = data;
    })
    .error(function (){
      $scope.messages = {response: false, message: $attrs.errorgettingcategories }
      scroll_to_top();
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
          $scope.messages = {response: false, message: $attrs.errorupdatingoutcome }
          scroll_to_top();
        });
    } else {
      $http.post('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes', $scope.current_outcome)
        .success(function (data) {
          get_outcomes($scope.project_id, $scope.objective_id)
          $scope.current_outcome = data;
          // console.log("outcomes before")
          // console.log($scope.outcomes)
          // $scope.outcomes.push(data);
          // console.log("outcomes after")
          // console.log($scope.outcomes)
          $scope.drag_outcomes.dropzones[0].push(data);
          //$scope.$apply();
          //init_dnd_list();
        })
        .error(function (){
          $scope.messages = {response: false, message: $attrs.errorcreatingoutcome }
          scroll_to_top();
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
    if(confirm($attrs.confirmdeleteoutcome)) {
    $http.delete('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes/'+outcome.id);
    $scope.outcomes.splice($scope.outcomes.indexOf(outcome),1);
    console.log('delete outcome:')
    console.log(outcome)
    console.log('$scope.outcomes.indexOf(outcome)')
    console.log($scope.outcomes.indexOf(outcome))
    console.log('$scope.drag_outcomes.dropzones:')
    console.log($scope.drag_outcomes.dropzones[0])
    
    $scope.drag_outcomes.dropzones[0].splice($scope.drag_outcomes.dropzones[0].indexOf(outcome),1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }
    
  $scope.add_edit_indicator = function(outcome) {
    $scope.outcome = outcome;
    if(outcome.indicator_id) {
      $http.get('/outcomes/'+outcome.id+'/indicators/'+outcome.indicator_id)
          .success(function(data){
            $scope.current_indicator = data;
          })
    } else
      $scope.current_indicator = {owner_name: "", owner_role: "", expected_results:"", obtained_results: "", settings: "", percentage: ""};

    $aside.open({
      templateUrl: 'indicator-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          $scope.messages_modal = { error: false, msg: ''}
          if( !isNaN($scope.current_indicator.percentage) ) {
              save_or_update_indicator()
              $modalInstance.dismiss();
              e.stopPropagation();
          } else {
            $scope.messages_modal = { error: true, msg: 'El porcentaje debe ser un nro válido'}
          }
        }
        $scope.cancel = function (e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });

  }
  
  var save_or_update_indicator = function() {
    if($scope.outcome.indicator_id) {
      $http.put('/outcomes/'+$scope.outcome.id+'/indicators/'+$scope.outcome.indicator_id, $scope.current_indicator)
          .success(function(){
            $scope.messages = { response: true, message: "Indicator actualizado"}
            get_outcomes($scope.project_id, $scope.objective_id);
          })
          .error(function(){
            $scope.messages = { response: false, message: "Error al actualizar los resultados de información"}
            scroll_to_top();
          });
    } else {
      $http.post('/outcomes/'+$scope.outcome.id+'/indicators/', $scope.current_indicator)
          .success(function(data){
            $scope.messages = { response: true, message: "Indicator añadido"}
            get_outcomes($scope.project_id, $scope.objective_id);
          })
          .error(function(){
            $scope.messages = { response: false, message: "Error al crear el indicador"}
            scroll_to_top();
          });
    }

  }
  
  $scope.getInclude = function(){
    if(true){
        return "item.htm";
    }
    return "";
  }
  
  function init_dnd_list() {
    if ($scope.drag_outcomes) {
          var obj = JSON.parse($scope.current_objective.theory_of_change);
          if (obj){
          if (obj.dropzones){
            if (obj.dropzones[0]){
              $scope.drag_outcomes = obj;
            }
          }
          }else{
            $scope.drag_outcomes.dropzones = [$scope.outcomes];
          }
    }else{
      $scope.drag_outcomes={
        selected: null,
        templates: [
            {type: "container", id: 1,"label":"Agrupador", elements: [[]]}
        ],
        dropzones:[$scope.outcomes]
    };
    }
    $scope.$watch('drag_outcomes', function(model) {
        if ($scope.current_objective) {
          $scope.current_objective.theory_of_change = JSON.stringify($scope.drag_outcomes);
          // console.log('$scope.current_objective.theory_of_change')
          // console.log($scope.current_objective.theory_of_change)
          save_or_update_objective();
        }
    }, true);
  };
  
  function get_objective(project_id, objective_id) {
    $http.get('/projects/' + project_id + '/objectives/' + objective_id + '.json')
      .success(function (data) {
        $scope.current_objective = data;
        init_dnd_list()
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingobjectives }
        scroll_to_top();
      });
  }
  get_objective($scope.project_id, $scope.objective_id);
  
  var save_or_update_objective = function () {
    if ($scope.current_objective.id) {
      $http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.current_objective.id, $scope.current_objective)
        .success(function (data) {
          // console.log('saved objective')
          // console.log(data)
          //get_solutions($scope.project_id);
          //get_objectives($scope.project_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingobjective }
          scroll_to_top()
        });
    } else {
      $http.post('/projects/' + $scope.project_id + '/objectives', $scope.current_objective)
        .success(function (data) {
          $scope.current_objective = data;
          //$scope.objectives.push(data);
          //get_solutions($scope.project_id);
          //get_objectives($scope.project_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingobjective }
          scroll_to_top();
        });
    }
  };

}]);