app.controller("stage6Ctrl", ["$scope", "$http", "$aside", "$location", "$attrs", function ($scope, $http, $aside, $location, $attrs) {
  $scope.project_id = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];
  $scope.messages = {response: "", description: ""}

  // //get all actors
  $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/actors.json')
  .success(function(data){
      $scope.actors = data;
  })
  .error(function (){
    $scope.messages = { response: false, message: $attrs.errorgettingactors }
  });

  function get_asks(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/asks.json')
    .success(function(data){
      // data.forEach(function(ask) {
      //   get_actor_of_ask(ask);
      // });
      $scope.asks = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: $attrs.errorgettingasks }
    });
  }
  get_asks($scope.project_id, $scope.objective_id);

  // function get_actor_of_ask(ask) {
  //   for (var i = 0; $scope.actors[i]; i++) {
  //     if ( ask.actor_id == $scope.actors[i].id ) {
  //       ask.actor_name = $scope.actors[i].name;
  //     }
  //   }
  // }


  $scope.add_edit_ask = function(ask) {
    $scope.current_ask = {
      title: "",
      description: "",
      objective_id: $scope.objective_id,
      project_id: $scope.project_id
    };

    if(ask){
      $scope.current_ask = ask;
    }

    $aside.open({
      templateUrl: 'add-ask.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function($scope, $modalInstance) {
        $scope.save = function(e) {
          if (!$scope.current_ask.description) {
            $scope.current_ask.description = description
            return
          }

          save_or_update_ask();
          $modalInstance.dismiss();
          e.stopPropagation();
          get_asks($scope.project_id, $scope.objective_id);
        }
        $scope.cancel = function(e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  }

  var save_or_update_ask = function() {
    // $scope.current_ask.ask = {
    //   title: '&nbsp;',
    //   description: $scope.current_ask.description,
    //   execution: $scope.current_ask.execution,
    //   scheduling: $scope.current_ask.scheduling,
    //   objective_id: $scope.current_ask.objective_id,
    //   project_id: $scope.current_ask.project_id,
    //   actor_id: $scope.current_ask.actor_id
    // }
    console.log($scope.current_ask)
    if($scope.current_ask.id) {
      $http.put('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/asks/'+$scope.current_ask.id, $scope.current_ask)
        .success(function(data){
          // get_actor_of_ask($scope.current_ask);
          // get_asks($scope.project_id, $scope.objective_id);
          // alert success or error
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingask }
        });
    }
    else {
      $http.post('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/asks', $scope.current_ask)
        .success(function(data){
          // get_actor_of_ask($scope.current_ask);
          $scope.current_ask = data;
          // get_asks($scope.project_id, $scope.objective_id);
          // $scope.asks.push(data);
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingask }
        });
    }
  }

  $scope.delete_ask = function(ask){
    if(confirm($attrs.confirmdeleteask)) {
    $http.delete('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/asks/'+ask.id);
    $scope.asks.splice($scope.asks.indexOf(ask),1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }

  $scope.add_edit_msj = function(ask, msj) {
    $scope.ask_id = ask.id;
    $scope.current_msj = {}
    if(ask && msj) {
      $http.get('/asks/'+ask.id+'/messages/'+msj.id+'.json')
        .success(function(data){
          $scope.current_msj = data
        })
        .error(function(){
          $scope.messages = { response: false, message: 'Error editando mensaje' }
        })

    }
    $aside.open({
      templateUrl: 'add-msj.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function($scope, $modalInstance) {
        $scope.save = function(e) {
          save_or_update_msj();
          $modalInstance.dismiss();
          e.stopPropagation();
          get_asks($scope.project_id, $scope.objective_id);
        }
        $scope.cancel = function(e) {
          $modalInstance.dismiss();
          e.stopPropagation();
        };
      }
    });
  }

  var save_or_update_msj = function() {
    if($scope.current_msj.id) {
      $http.put('/asks/'+$scope.current_msj.ask_id+'/messages/'+$scope.current_msj.id, $scope.current_msj)
        .success(function(data){
        })
        .error(function(){
          $scope.messages = { response: false, message: 'Error actualizando el mensaje' }
        })
    } else {
      $scope.current_msj.ask_id = $scope.ask_id;
      $http.post('/asks/'+$scope.ask_id+'/messages/', $scope.current_msj)
        .success(function(data){
        })
        .error(function(){
          $scope.messages = { response: false, message: 'Error al guardar mensaje' }
        })
    }
  }

  $scope.delete_msj = function(ask, msj){
    if(confirm($attrs.confirmdeleteask)) {
      $http.delete('/asks/'+ask.id+'/messages/'+msj.id);
      // $scope.asks.splice($scope.asks.indexOf(ask),1);
      get_asks($scope.project_id, $scope.objective_id);
    }
  }
}]);
