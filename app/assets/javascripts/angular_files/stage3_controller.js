app.controller("stage3Ctrl", function($scope, $http, $aside, $location){
    // $scope.btn_problem = "Add";
    $scope.project_id = $location.path().split("/")[2];
    $scope.objective_id = $location.path().split("/")[4];
    // $scope.problem = {title: "", description: "", focus_area: "", project_id: $scope.project_id};

    // $scope.policies = [];
    // $scope.current_policy = {title: "", description: ""};
    // $scope.current_solution = {title: "", description: ""};
    $scope.current_actor = {name: "", description: "", objective_id: $scope.objective_id};

    $http.get('/projects/'+$scope.project_id+'.json')
    .success(function(data){
        $scope.project = data;
        // $scope.problem_id = data.real_problem_id;
        // if($scope.problem_id) {
        //     $http.get('/real_problems/'+$scope.problem_id+'.json')
        //         .success(function(data){
        //             $scope.problem = data;
        //             $scope.btn_problem = "Edit";
        //         });
        //     $http.get('/real_problems/'+$scope.problem_id+'/policy_problems.json')
        //         .success(function(data){
        //             $scope.policies = data;
        //             var i = 0;
        //             while( i < data.length ) {
        //                 get_solutions($scope.problem_id, data[i].id, i);
        //                 i++;
        //             }
        //         })
        // }
    });

    $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/actors.json')
    .success(function(data){
        $scope.actors = data;
    });

    // var get_solutions = function(problem_id, policy_id, i){
    //     $http.get('/real_problems/'+problem_id+'/policy_problems/'+policy_id+'/solutions.json')
    //         .success(function(data){
    //             $scope.policies[i].solutions = data;
    //         })
    // }

    // var get_solution = function(problem_id, policy_id, solution_id) {
    //     console.log('/real_problems/'+problem_id+'/policy_problems/'+policy_id+'/solutions/'+solution_id+'.json');
    //     $http.get('/real_problems/'+problem_id+'/policy_problems/'+policy_id+'/solutions/'+solution_id+'.json')
    //         .success(function(data){
    //             $scope.current_solution = data;
    //         })
    // }

    // var save_or_update_problem = function(){ 
    //     if($scope.problem.title == "")
    //         //debería tirar un warning
    //         return

    //     if($scope.problem.id){
    //         $http.put("/real_problems/"+$scope.problem.id, $scope.problem)
    //         .success(function(data){
    //             // alertar en caso de success o error
    //         })
    //     }else{
    //         $http.post("/real_problems", $scope.problem)
    //         .success(function(data){
    //             $scope.problem = data;
    //             $scope.btn_problem = "Edit";
    //         })
    //     }
    // };

    // var save_or_update_policy = function(){
    //     if($scope.problem.id == "" || $scope.current_policy.title == "")
    //         return

    //     if($scope.current_policy.id){
    //         $http.put("/real_problems/"+$scope.problem.id+"/policy_problems/"+$scope.current_policy.id, $scope.current_policy)
    //             .success(function(data){
    //                 // alertar en caso de success o error
    //                 $http.get('/real_problems/'+$scope.problem_id+'/policy_problems.json')
    //                     .success(function(data){
    //                         $scope.policies = data;
    //                         $scope.current_policy = {title: "", description: ""};
    //                     })
    //             })
    //     }else{
    //         $http.post("/real_problems/"+$scope.problem.id+"/policy_problems", $scope.current_policy)
    //         .success(function(data){
    //             $scope.policies.push(data);
    //         })
    //     }
    // };

    var save_or_update_actor = function() {
        // console.log($scope.current_solution)
        if($scope.current_actor.id) {
            $http.put("/actors/"+$scope.current_actor.id, $scope.current_actor)
                .success(function(data){
                    // alert success or error
                })
        } else {
            $http.post("/actors", $scope.current_actor)
                .success(function(data){
                    $scope.current_actor = data;
                    $scope.actors.push(data);
                })
        }
    }

    // $scope.add_step_one = function() {
    //     $aside.open({
    //         templateUrl: 'aside.html',
    //         placement: 'left',
    //         size: 'lg',
    //         scope: $scope,
    //         controller: function($scope, $modalInstance) {
    //             $scope.save = function(e) {
    //                 save_or_update_problem();
    //                 $modalInstance.dismiss();
    //                 e.stopPropagation();
    //             }
    //             $scope.cancel = function(e) {
    //               $modalInstance.dismiss();
    //               e.stopPropagation();
    //             };
    //         }
    //     });
    // };

    // $scope.add_edit_policy = function(current_policy_id) {
    //     if(current_policy_id) {
    //         $http.get("/real_problems/"+$scope.problem.id+"/policy_problems/"+current_policy_id+".json")
    //             .success(function(data){
    //                 $scope.current_policy = data;
    //             })
    //     } else {
    //         $scope.current_policy = {title: "", description: ""};
    //     }

    //     $aside.open({
    //         templateUrl: 'policy-aside.html',
    //         placement: 'left',
    //         size: 'lg',
    //         scope: $scope,
    //         controller: function($scope, $modalInstance) {
    //             $scope.save = function(e) {
    //                 save_or_update_policy();
    //                 $modalInstance.dismiss();
    //                 e.stopPropagation();
    //             }
    //             $scope.cancel = function(e) {
    //               $modalInstance.dismiss();
    //               e.stopPropagation();
    //             };
    //         }
    //     });
    // };

    $scope.delete_actor = function(actor){
      if(confirm('Are you sure you want to delete this actor?')) {
        $http.delete('/actors/'+actor.id);
        $scope.actors.splice($scope.actors.indexOf(actor),1);
      }
    }

    $scope.add_edit_actor = function(actor) {
        if(actor)
            $scope.current_actor = actor;
        else
            $scope.current_actor = {name: "", description: "", objective_id: $scope.objective_id};
        
        // $scope.actor_id = actor_id;

        // if( $scope.solution_id )
        //     get_solution($scope.problem_id, $scope.policy_id, $scope.solution_id);

        $aside.open({
            templateUrl: 'actor-aside.html',
            placement: 'left',
            size: 'lg',
            scope: $scope,
            controller: function($scope, $modalInstance) {
                $scope.save = function(e) {
                    save_or_update_actor();
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

    
});