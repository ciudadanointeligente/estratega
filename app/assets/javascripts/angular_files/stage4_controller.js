app.controller("stage4Ctrl", function ($scope, $http, $aside, $location) {
	$scope.project_id = $location.path().split("/")[2];
	$scope.objective_id = $location.path().split("/")[4];

	function get_outcomes(project_id, objective_id) {
		$http.get('/projects/' + project_id + '/objectives/' + objective_id + '/outcomes.json')
			.success(function (data) {
				$scope.outcomes = data;
			});
	}

	function get_outcomes_categories() {
		$http.get('/outcomes/categories.json')
			.success(function (data) {
				$scope.outcomes_categories = data;
			});
	}

	get_outcomes($scope.project_id, $scope.objective_id);
	get_outcomes_categories();

	var save_or_update_outcome = function () {
		if ($scope.current_outcome.id) {
			$http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/outcomes/' + $scope.current_outcome.id, $scope.current_outcome)
				.success(function (data) {
					// alert success or error
				});
		} else {
			$http.post('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/outcomes', $scope.current_outcome)
				.success(function (data) {
					$scope.current_outcome = data;
					$scope.outcomes.push(data);
				});
		}
	}

	$scope.add_edit_outcome = function (outcome = '') {
		if (outcome) {
			$scope.current_outcome = outcome;
		} else
			$scope.current_outcome = {
				title: "",
				description: "",
				categorie: "",
				objective_id: $scope.objective_id
			};

		title = outcome.title;
		description = outcome.description;
		categorie = outcome.categorie;

		$aside.open({
			templateUrl: 'outcome-aside.html',
			placement: 'left',
			size: 'lg',
			scope: $scope,
			controller: function ($scope, $modalInstance) {
				$scope.save = function (e) {
					if (!$scope.current_outcome.title) {
						$scope.current_outcome.title = title
						return
					}

					save_or_update_outcome()
					$modalInstance.dismiss();
					e.stopPropagation();
				}
				$scope.cancel = function (e) {
					//if (!$scope.current_outcome.title)
					$scope.current_outcome.title = title
					$scope.current_outcome.description = description
					$scope.current_outcome.categorie = categorie

					$modalInstance.dismiss();
					e.stopPropagation();
				};
			}
		});
	}

	$scope.delete_outcome = function (outcome) {
		if (confirm('Are you sure you want to delete this outcome?')) {
			$http.delete('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/outcomes/' + outcome.id);
			$scope.outcomes.splice($scope.outcomes.indexOf(outcome), 1);
		}
	}

});