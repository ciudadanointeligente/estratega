app.controller("stage2Ctrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.btn_problem = "Add";
  $scope.problem = {};
  $scope.objective_types = {};
  $scope.messages = {response: "", message: ""}

  $http.get('/real_problems/focus_area.json')
    .success(function (data) {
      $scope.focus_areas = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: "Error while getting focus area information"}
    });

  function get_objective_types(project_id) {
    $http.get('/projects/' + project_id + '/objectives/objective_types.json')
      .success(function(data){
        $scope.objective_types = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting objective types information"}
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
        $scope.messages = { response: false, message: "Error while getting the project information"}
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
        $scope.messages = { response: false, message: "Error while creating the real problem information"}
      });
  }

  function get_real_problem(real_problem_id) {
    $http.get('/real_problems/' + real_problem_id + '.json')
      .success(function (data) {
        $scope.problem = data;
        if( data.goal )
          $scope.btn_problem = "Edit";
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting the real problem information"}
      });
  }

  function get_objectives(project_id) {
    $http.get('/projects/' + project_id + '/objectives.json')
      .success(function (data) {
        $scope.objectives = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting objectives information"}
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
        $scope.messages = { response: false, message: "Error while getting solutions information"}
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
          $scope.messages = { response: false, message: "Error while updating objective information"}
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
          $scope.messages = { response: false, message: "Error while creating objective information"}
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
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while updating the goal information"}
        });
    } else {
      $scope.problem.project_id = $scope.project_id
      $http.post("/real_problems", $scope.problem)
        .success(function (data) {
          $scope.problem = data;
          $scope.btn_problem = "Edit";
          $scope.problem_id = data.id;
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while creating the real problem information"}
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
        solution_ids: []
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

}]);
