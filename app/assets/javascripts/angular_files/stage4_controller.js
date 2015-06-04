app.controller("stage4Ctrl", function($scope, $http, $aside, $location){
    
    $scope.project_id = $location.path().split("/")[2];
    $scope.objective_id = $location.path().split("/")[4];
    $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes.json')
    .success(function(data){
        $scope.outcomes = data;
    });

    var save_or_update_outcome = function(){
        if($scope.current_outcome.id) {
            $http.put('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes/'+$scope.current_outcome.id, $scope.current_outcome)
                .success(function(data){
                    // alert success or error
                })
        } else {
            $http.post('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/outcomes', $scope.current_outcome)
                .success(function(data){
                    $scope.current_outcome = data;
                    $scope.outcomes.push(data);
                })
        }
    }

    $scope.add_edit_outcome = function(outcome) {
        if(outcome){
            console.log(outcome)
            $scope.current_outcome = outcome;
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
                    save_or_update_outcome();
                    $modalInstance.dismiss();
                    e.stopPropagation();
                }
                $scope.cancel = function(e) {
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











    // $scope.current_actor = {name: "", description: "", objective_id: $scope.objective_id};
    // $scope.current_environment = {}

    // $http.get('/projects/'+$scope.project_id+'.json')
    // .success(function(data){
    //     $scope.project = data;
    // });

    // $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id)
    // .success(function(data){
    //     $scope.objective = data;
    // });

    // $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/actors.json')
    // .success(function(data){
    //     $scope.actors = data;
    // });

    // var save_or_update_actor = function() {
    //     if($scope.current_actor.id) {
    //         $http.put("/actors/"+$scope.current_actor.id, $scope.current_actor)
    //             .success(function(data){
    //                 // alert success or error
    //             })
    //     } else {
    //         $http.post("/actors", $scope.current_actor)
    //             .success(function(data){
    //                 $scope.current_actor = data;
    //                 $scope.actors.push(data);
    //             })
    //     }
    // }

    // $scope.save_or_update_enabling_factor = function(current_enabling_factor, original_enabling_factor) {
    //     if(original_enabling_factor){
    //         var enabling_factor_index = $scope.objective.enabling_factors.indexOf(original_enabling_factor)
    //         $scope.objective.enabling_factors[enabling_factor_index] = current_enabling_factor;
    //     }
    //     else{
    //         $scope.objective.enabling_factors.push(current_enabling_factor);
    //     }
    //     update_objective();
    // }

    // $scope.save_or_update_barrier = function(current_barrier, original_barrier) {
    //     if(original_barrier){
    //         var barrier_index = $scope.objective.barriers.indexOf(original_barrier)
    //         $scope.objective.barriers[barrier_index] = current_barrier;
    //     }
    //     else{
    //         $scope.objective.barriers.push(current_barrier);
    //     }
    //     update_objective();
    // }

    // var update_objective = function() {
    //     $http.put('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id, $scope.objective)
    //         .success(function(data){
    //             // alert success or error
    //         })
    // }

    // $scope.delete_actor = function(actor){
    //   if(confirm('Are you sure you want to delete this actor?')) {
    //     $http.delete('/actors/'+actor.id);
    //     $scope.actors.splice($scope.actors.indexOf(actor),1);
    //   }
    // }

    // $scope.add_edit_actor = function(actor) {
    //     if(actor)
    //         $scope.current_actor = actor;
    //     else
    //         $scope.current_actor = {name: "", description: "", objective_id: $scope.objective_id};
        
    //     $aside.open({
    //         templateUrl: 'actor-aside.html',
    //         placement: 'left',
    //         size: 'lg',
    //         scope: $scope,
    //         controller: function($scope, $modalInstance) {
    //             $scope.save = function(e) {
    //                 save_or_update_actor();
    //                 $modalInstance.dismiss();
    //                 e.stopPropagation();
    //             }
    //             $scope.cancel = function(e) {
    //               $modalInstance.dismiss();
    //               e.stopPropagation();
    //             };
    //         }
    //     });
    // }

    // $scope.add_edit_enabling_factor = function(enabling_factor) {
    //     if(enabling_factor)
    //         $scope.current_enabling_factor = enabling_factor;
    //     else
    //         $scope.current_enabling_factor = "";
        
    //     $aside.open({
    //         templateUrl: 'enabling-factor-aside.html',
    //         placement: 'left',
    //         size: 'lg',
    //         scope: $scope,
    //         controller: function($scope, $modalInstance) {
    //             $scope.save = function(e) {
    //                 console.log($scope.current_enabling_factor)
    //                 $scope.save_or_update_enabling_factor($scope.current_enabling_factor, enabling_factor);
    //                 $modalInstance.dismiss();
    //                 e.stopPropagation();
    //             }
    //             $scope.cancel = function(e) {
    //               $modalInstance.dismiss();
    //               e.stopPropagation();
    //             };
    //         }
    //     });
    // }

    // $scope.add_edit_barrier = function(barrier) {
    //     if(barrier)
    //         $scope.current_barrier = barrier;
    //     else
    //         $scope.current_barrier = "";

    //     $aside.open({
    //         templateUrl: 'barrier-aside.html',
    //         placement: 'left',
    //         size: 'lg',
    //         scope: $scope,
    //         controller: function($scope, $modalInstance) {
    //             $scope.save = function(e) {
    //                 console.log($scope.current_barrier)
    //                 $scope.save_or_update_barrier($scope.current_barrier, barrier);
    //                 $modalInstance.dismiss();
    //                 e.stopPropagation();
    //             }
    //             $scope.cancel = function(e) {
    //               $modalInstance.dismiss();
    //               e.stopPropagation();
    //             };
    //         }
    //     });
    // }

    // $scope.delete_enabling_factor = function(enabling_factor){
    //   if(confirm('Are you sure you want to delete this enabling factor?')) {
    //     var enabling_factor_index = $scope.objective.enabling_factors.indexOf(enabling_factor);
    //     $scope.objective.enabling_factors.splice(enabling_factor_index, 1);
    //     update_objective();
    //   }
    // }

    // $scope.delete_barrier = function(barrier){
    //   if(confirm('Are you sure you want to delete this enabling factor?')) {
    //     var barrier_index = $scope.objective.barriers.indexOf(barrier);
    //     $scope.objective.barriers.splice(barrier_index, 1);
    //     update_objective();
    //   }
    // }
});