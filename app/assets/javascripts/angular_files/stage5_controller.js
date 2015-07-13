app.controller("stage5Ctrl", function($scope, $http, $aside, $location){
	$scope.project_id 	= $location.path().split("/")[2];
	$scope.objective_id = $location.path().split("/")[4];
	$scope.outcome_id 	= $location.path().split("/")[6];

	$scope.outcome 		= [];
	$scope.activities 	= [];
	$scope.current_activity = {title:"", description:"", outcome_ids: [$scope.outcome_id]};

	function get_outcome(project_id, objective_id, outcome_id) {
		$http.get('/projects/'+project_id+'/objectives/'+objective_id+'/outcomes/'+outcome_id+'.json')
			.success(function (data){
				$scope.outcome = data;
			})
	}

	function get_activities(project_id, outcome_id) {
		$http.get('/projects/'+project_id+'/activities?outcome_id='+outcome_id)
			.success(function (data) {
				$scope.activities = data;
			});
	}

	get_outcome($scope.project_id, $scope.objective_id, $scope.outcome_id);
	get_activities($scope.project_id, $scope.outcome_id);

	$scope.add_edit_activity = function(activity) {
		$scope.current_activity = {title:"", description:"", outcome_ids: [$scope.outcome_id]};
		if (activity.title)
			$scope.current_activity = activity;
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
		// $scope.current_activity.outcome_id = $scope.outcome_id;
		$scope.current_activity.activity = {
			title: $scope.current_activity.title,
			description: $scope.current_activity.description,
			outcome_ids: $scope.current_activity.outcome_ids
		}
		if ($scope.current_activity.id) {
			$http.put('/projects/' + $scope.project_id + '/activities/' + $scope.current_activity.id, $scope.current_activity)
				.success(function (data) {
					// alert success or error
				});
		} else {
			$http.post('/projects/' + $scope.project_id + '/activities', $scope.current_activity)
				.success(function (data) {
					$scope.current_activity = data;
				});
		}
	}
});