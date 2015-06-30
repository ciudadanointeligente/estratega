app.controller("stage2Ctrl", function ($scope, $http, $aside, $location) {

	$scope.project_id = $location.path().split("/")[2];

	$http.get('/real_problems/focus_area.json')
		.success(function (data) {
			$scope.focus_areas = data
		})

	$http.get('/projects/' + $scope.project_id + '.json')
		.success(function (data) {
			$scope.project = data;
			get_real_problem(data.id);
		});

	function get_real_problem(project_id) {
		$http.get('/real_problems/' + project_id + '.json')
			.success(function (data) {
				$scope.problem = data;
			});
	}

	$http.get('/projects/' + $scope.project_id + '/objectives.json')
		.success(function (data) {
			$scope.objectives = data;
		});

	$http.get('/projects/' + $scope.project_id + '/solutions.json')
		.success(function (data) {
			$scope.solutions = data.map(function (solution) {
				return {
					id: solution.id,
					title: solution.title
				}
			});
		});

	var save_or_update_objective = function () {
		/*ugly hack*/
		$scope.current_objective.objective = {
			title: $scope.current_objective.title,
			description: $scope.current_objective.description,
			project_id: $scope.current_objective.project_id,
			solution_ids: $scope.current_objective.solution_ids
		}
		if ($scope.current_objective.id) {
			$http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.current_objective.id, $scope.current_objective)
				.success(function (data) {
					// alert success or error
				})
		} else {
			$http.post('/projects/' + $scope.project_id + '/objectives', $scope.current_objective)
				.success(function (data) {
					$scope.current_objective = data;
					$scope.objectives.push(data);
				})
		}
	};

	var save_or_update_problem = function () {
		if ($scope.problem.title == "")
			return

		if ($scope.problem.id) {
			$http.put("/real_problems/" + $scope.problem.id, $scope.problem)
				.success(function (data) {
					// alertar en caso de success o error
				})
		} else {
			$scope.problem.project_id = $scope.project_id
			$http.post("/real_problems", $scope.problem)
				.success(function (data) {
					$scope.problem = data;
					$scope.btn_problem = "Edit";
					$scope.problem_id = data.id;
				})
		}
	};

	$scope.edit_real_problem = function () {
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
					$modalInstance.dismiss();
					e.stopPropagation();
				};
			}
		})
	};

	$scope.show_goal = function() {
		$aside.open({
			templateUrl: 'goal-aside.html',
			placement: 'left',
			size: 'lg',
			scope: $scope,
			controller: function ($scope, $modalInstance) {
				$scope.save = function (e) {
					//save_or_update_problem();
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
		} else
			$scope.current_objective = {
				title: "",
				description: "",
				project_id: $scope.project_id,
				solution_ids: []
			};

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

	$scope.delete_objective = function (objective) {
		if (confirm('Are you sure you want to delete this objective?')) {
			$http.delete('/projects/' + $scope.project_id + '/objectives/' + objective.id);
			$scope.objectives.splice($scope.objectives.indexOf(objective), 1);
		}
	}

});