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
    scroll_to_top();
  });

  function get_asks(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/asks.json')
    .success(function(data){
      $scope.asks = data;
    })
    .error(function (){
      $scope.messages = { response: false, message: $attrs.errorgettingasks }
      scroll_to_top();
    });
  }
  get_asks($scope.project_id, $scope.objective_id);

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
    if($scope.current_ask.id) {
      $http.put('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/asks/'+$scope.current_ask.id, $scope.current_ask)
        .success(function(data){
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingask }
          scroll_to_top();
        });
    }
    else {
      $http.post('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/asks', $scope.current_ask)
        .success(function(data){
          $scope.current_ask = data;
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingask }
          scroll_to_top();
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
      get_asks($scope.project_id, $scope.objective_id);
    }
  }
}]);
