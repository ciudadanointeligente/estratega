app.controller("stage2Ctrl", ["$scope", "$http", "$aside", "$location", "$attrs", function ($scope, $http, $aside, $location, $attrs) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.btn_problem = "Agregar";
  $scope.problem = {};
  $scope.objective = {};
  $scope.objective_types = {};
  $scope.messages = {response: "", message: ""}

  $http.get('/real_problems/focus_area.json')
    .success(function (data) {
      $scope.focus_areas = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: $attrs.errorfocusarea }
      scroll_to_top();
    });

  function get_objective_types(project_id) {
    $http.get('/projects/' + project_id + '/objectives/objective_types.json')
      .success(function(data){
        $scope.objective_types = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorobjectivetypes }
        scroll_to_top();
      });
  }

  get_objective_types($scope.project_id);

  function get_data_project(project_id) {
    $http.get('/projects/' + project_id + '.json')
      .success(function (data) {
        $scope.project = data;
        if(data.real_problem_id)
          get_real_problem(data.real_problem_id);
        else
          create_real_problem(project_id);
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorproject }
        scroll_to_top();
      });
  }

  get_data_project($scope.project_id);

  function create_real_problem(project_id) {
    $scope.problem = {
      title: ".",
      project_id: project_id
    }

    $http.post('/real_problems/', $scope.problem)
      .success(function(data){
        get_data_project($scope.project_id);
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorcreatingrealproblem }
        scroll_to_top();
      });
  }

  function get_real_problem(real_problem_id) {
    $http.get('/real_problems/' + real_problem_id + '.json')
      .success(function (data) {
        $scope.problem = data;
        if( data.goal )
          $scope.btn_problem = "Editar";
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingrealproblem }
        scroll_to_top();
      });
  }

  function get_objectives(project_id) {
    $http.get('/projects/' + project_id + '/objectives.json')
      .success(function (data) {
        $scope.objectives = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingobjectives }
        scroll_to_top();
      });
  }
  get_objectives($scope.project_id);

  function get_solutions(project_id) {
    $scope.unrelated_solutions = 0;

    $http.get('/projects/' + project_id + '/solutions.json')
      .success(function (data) {
        $scope.solutions = data.map(function (solution) {
          return {
            id: solution.id,
            title: solution.title,
            description: solution.description,
            objective_ids: solution.objective_ids
          }
        });
        get_unrelated_solutions($scope.solutions);
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingsolutions }
        scroll_to_top();
      });
  };
  function get_unrelated_solutions(data) {
    var cnt = 0;
    data.forEach(function(the_data){
      if( the_data['objective_ids'].length < 1 ) {
        cnt = cnt + 1;
      }
    });
    $scope.unrelated_solutions = cnt;
  }
  get_solutions($scope.project_id);

  var save_or_update_objective = function () {
    if ($scope.current_objective.id) {
      $http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.current_objective.id, $scope.current_objective)
        .success(function (data) {
          // alert success or error
          get_solutions($scope.project_id);
          get_objectives($scope.project_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingobjective }
          scroll_to_top()
        });
    } else {
      $http.post('/projects/' + $scope.project_id + '/objectives', $scope.current_objective)
        .success(function (data) {
          $scope.current_objective = data;
          $scope.objectives.push(data);
          get_solutions($scope.project_id);
          get_objectives($scope.project_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingobjective }
          scroll_to_top();
        });
    }
  };

  var save_or_update_problem = function () {
    if ($scope.problem.goal == "")
      return

    if ($scope.problem.id) {
      $http.put("/real_problems/" + $scope.problem.id, $scope.problem)
        .success(function (data) {
          // alertar en caso de success o error
          $scope.btn_problem = "Editar";
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatinggoal }
          scroll_to_top();
        });
    } else {
      $scope.problem.project_id = $scope.project_id
      $http.post("/real_problems", $scope.problem)
        .success(function (data) {
          $scope.problem = data;
          $scope.btn_problem = "Editar";
          $scope.problem_id = data.id;
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorgettingrealproblem }
          scroll_to_top();
        });
    }
  };

  $scope.show_goal = function() {
    $aside.open({
      templateUrl: 'goal-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_problem();
          $modalInstance.dismiss();
          e.stopPropagation();
        }
        $scope.cancel = function (e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    })
  };

  $scope.add_edit_objective = function (objective) {
    if (objective) {
      $scope.current_objective = objective;
    } else {
      $scope.current_objective = {
        title: "",
        description: "",
        project_id: $scope.project_id,
        solution_ids: [],
        prioritized: true
      };
    }

    $aside.open({
      templateUrl: 'objective-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_objective();
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

  $scope.list_policy_solutions = function() {
    $aside.open({
      templateUrl: 'solutions-list-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.cancel = function (e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  }

  $scope.delete_objective = function (objective) {
    if (confirm('Are you sure you want to delete this objective?')) {
      $http.delete('/projects/' + $scope.project_id + '/objectives/' + objective.id);
      $scope.objectives.splice($scope.objectives.indexOf(objective), 1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }


  $scope.add_edit_prioritized = function (objective) {
    if (objective) {
      $scope.current_objective = objective;
    } else {

    }

    $aside.open({
      templateUrl: 'prioritized-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_objective();
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

  $scope.add_edit_indicator = function(objective) {
    $scope.objective = objective;
    if(objective.indicator_id) {
      $http.get('/objectives/'+objective.id+'/indicators/'+objective.indicator_id)
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
            $scope.messages_modal = { error: true, msg: 'Percentage must be a valid number'}
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
    if($scope.objective.indicator_id) {
      $http.put('/objectives/'+$scope.objective.id+'/indicators/'+$scope.objective.indicator_id, $scope.current_indicator)
          .success(function(){
            $scope.messages = { response: true, message: "Indicator updated"}
            get_objectives($scope.project_id, $scope.objective_id);
          })
          .error(function(){
            $scope.messages = { response: false, message: "Error updating"}
            scroll_to_top();
          });
    } else {
      $http.post('/objectives/'+$scope.objective.id+'/indicators/', $scope.current_indicator)
          .success(function(data){
            $scope.messages = { response: true, message: "Indicator added"}
            get_objectives($scope.project_id, $scope.objective_id);
          })
          .error(function(){
            $scope.messages = { response: false, message: "Error creating indicator"}
            scroll_to_top();
          });
    }

  }

  function get_objective(project_id, objective_id) {
    $http.get('/projects/' + project_id + '/objectives/' + objective_id + '.json')
      .success(function (data) {
        $scope.objective = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingobjectives }
        scroll_to_top();
      });
  }
  //get_objective($scope.project_id, $scope.objective_id);

}]);
