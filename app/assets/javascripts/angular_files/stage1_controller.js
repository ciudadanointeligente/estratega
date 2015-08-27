app.controller("stage1Ctrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.messages = {response: "", message: ""}
  $http.get('/real_problems/focus_area.json')
    .success(function (data) {
      $scope.focus_areas = data
    })
    .error(function (){
      $scope.messages = { response: false, message: "Error while getting focus area information"}
    });

  $scope.btn_problem = "Add";
  $scope.problem = {
    title: "",
    description: ""
  };
  $scope.policies = [];
  $scope.current_policy = {
    title: "",
    description: ""
  };
  $scope.current_solution = {
    title: "",
    description: ""
  };

  $http.get('/projects/' + $scope.project_id + '.json')
    .success(function (data) {
      $scope.project = data;
      $scope.problem_id = data.real_problem_id;
      if ($scope.problem_id) {
        $http.get('/real_problems/' + $scope.problem_id + '.json')
          .success(function (data) {
            $scope.problem = data;
            $scope.btn_problem = "Edit";
          })
          .error(function (){
            $scope.messages = { response: false, message: "Error while getting the project information"}
          });
        get_policy_solutions($scope.problem_id);
      }
    });

  var get_policy_solutions = function (problem_id) {
    $http.get('/real_problems/' + problem_id + '/policy_problems.json')
      .success(function (data) {
        $scope.policies = data;
        var i = 0;
        while (i < data.length) {
          get_solutions(problem_id, data[i].id, i);
          i++;
        }
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting policy problems information"}
      });
  }

  var get_solutions = function (problem_id, policy_id, i) {
    $http.get('/real_problems/' + problem_id + '/policy_problems/' + policy_id + '/solutions.json')
      .success(function (data) {
        $scope.policies[i].solutions = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting solutions information"}
      });
  }

  var get_solution = function (problem_id, policy_id, solution_id) {
    $http.get('/real_problems/' + problem_id + '/policy_problems/' + policy_id + '/solutions/' + solution_id + '.json')
      .success(function (data) {
        $scope.current_solution = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error while getting a solution information"}
      });
  }

  var save_or_update_problem = function () {
    if ($scope.problem.title == "")
      return

    if ($scope.problem.id) {
      $http.put("/real_problems/" + $scope.problem.id, $scope.problem)
        .success(function (data) {
          // alert success or error
        })
        .error(function (){
          console.log('fail')
          $scope.messages = { response: false, message: "Error while updating information"}
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
          $scope.messages = { response: false, message: "Error while insert information"}
        });
    }
  };

  var save_or_update_policy = function () {
    $scope.current_policy.description = '&nbsp;';
    if ($scope.problem.id == "" || $scope.current_policy.title == "")
      return

    if ($scope.current_policy.id) {
      $http.put("/real_problems/" + $scope.problem.id + "/policy_problems/" + $scope.current_policy.id, $scope.current_policy)
        .success(function (data) {
          // alert success or error
          $http.get('/real_problems/' + $scope.problem_id + '/policy_problems.json')
            .success(function (data) {
              $scope.policies = data;
              $scope.current_policy = {
                title: "",
                description: ""
              };
            })
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while updating a policy information"}
        });
    } else {
      $http.post("/real_problems/" + $scope.problem.id + "/policy_problems", $scope.current_policy)
        .success(function (data) {
          $scope.policies.push(data);
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while creating a policy information"}
        });
    }
  };

  var save_or_update_solution = function (problem_id, policy_id, solution_id) {
    $scope.current_solution.description = '&nbsp;';
    if ($scope.current_solution.id) {
      $http.put("/real_problems/" + problem_id + "/policy_problems/" + policy_id + "/solutions/" + solution_id + ".json", $scope.current_solution)
        .success(function (data) {
          get_policy_solutions(problem_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while updating a solution information"}
        });
    } else {
      $http.post("/real_problems/" + problem_id + "/policy_problems/" + policy_id + "/solutions", $scope.current_solution)
        .success(function (data) {
          get_policy_solutions(problem_id);
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while creating a solution information"}
        });
    }
  }

  $scope.delete_solution = function (problem_id, policy_id, solution) {
    if (confirm('Are you sure you want to delete this solution?')) {
      $http.delete('/real_problems/' + problem_id + '/policy_problems/' + policy_id + '/solutions/' + solution.id);
      get_policy_solutions(problem_id)
    }
  }

  $scope.add_step_one = function () {
    title = $scope.problem.title;
    description = $scope.problem.description;
    categorie = $scope.problem.categorie;
    focus_area = $scope.problem.focus_area;

    $aside.open({
      templateUrl: 'aside.html',
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
          $scope.problem.title = title;
          $scope.problem.description = description;
          $scope.problem.categorie = categorie;
          $scope.problem.focus_area = focus_area;

          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  };

  $scope.add_edit_policy = function (current_policy_id) {
    if (current_policy_id) {
      $http.get("/real_problems/" + $scope.problem.id + "/policy_problems/" + current_policy_id + ".json")
        .success(function (data) {
          $scope.current_policy = data;
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while getting the policy problem information"}
        });
    } else {
      $scope.current_policy = {
        title: "",
        description: ""
      };
    }

    $aside.open({
      templateUrl: 'policy-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_policy();
          $modalInstance.dismiss();
          get_policy_solutions($scope.problem_id);
          e.stopPropagation();
        }
        $scope.cancel = function (e) {
          $modalInstance.dismiss();
          get_policy_solutions($scope.problem_id);
          e.stopPropagation();
        };
      }
    });
  };

  $scope.add_edit_solution = function (policy_id, solution_id) {
    $scope.policy_id = policy_id;
    $scope.solution_id = solution_id;

    if ($scope.solution_id)
      get_solution($scope.problem_id, $scope.policy_id, $scope.solution_id);
    else
      $scope.current_solution = {
        title: "",
        description: ""
      };

    $aside.open({
      templateUrl: 'solution-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_solution($scope.problem_id, $scope.policy_id, $scope.solution_id);
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

  $scope.delete_policy = function (policy){
    if(confirm('Are you sure you want to delete this policy problem?')) {
      $http.delete('/real_problems/' + $scope.problem.id + '/policy_problems/' + policy.id)
      $scope.policies.splice($scope.policies.indexOf(policy),1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }
}]);
