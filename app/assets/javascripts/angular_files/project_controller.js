app.controller("projectCtrl", ["$scope", "$http", "$aside", "$location", function ($scope, $http, $aside, $location) {

  $scope.projects = [];
  $scope.current_project = { title: "", description: "", focus_area: "", public: false };
  $scope.focus_areas = [];
  $scope.messages = {response: "", message: ""}
  $scope.share = {share_users: "", message: ""}

  $http.get('/real_problems/focus_area.json')
    .success(function (data) {
      $scope.focus_areas = data
    });

  function get_projects() {
    $http.get('/projects.json')
      .success(function (data){
        $scope.projects = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: "Error al obtener proyectos"}
      })
  }

  function get_public_projects() {
    $http.get('/projects.json?public=true')
      .success(function(data){
        $scope.public_projects = data;
      })
      .error(function(){
        $scope.messages = { response: false, message: "Error al obtener los proyectos públicos"}
      })
  }

  get_projects();
  get_public_projects()

  function save_or_update_project() {

    if( $scope.current_project.id ) {
      $http.put('/projects/' + $scope.current_project.id, $scope.current_project)
        .success(function (data){
          $scope.messages = { response: true, message: "Proyecto actualizado!"}
        })
        .error(function(){
          $scope.messages = { response: false, message: "Error al actualizar Proyecto!"}
        });
    } else {
      $http.post('/projects', $scope.current_project)
        .success(function (data){
          $scope.messages = { response: true, message: "Proyecto creado!"}
        });
    }

    get_projects();
  }

  function get_project_info(project) {
    if( project ) {
      $http.get("/projects/" + project.id + ".json")
        .success(function (data) {
          $scope.current_project = data;
        })
        .error(function(){
          $scope.messages = { response: false, message: "Error al recuperar los datos!!!"}
        });
    } else {
      $scope.current_project = { title: "", description: "", focus_area: "", public: false };
    }
  }

  $scope.add_edit_project = function(project) {
    get_project_info(project)

    $aside.open({
      templateUrl: 'project-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_project();
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

  $scope.delete_project = function (project){
    $http.get('/projects/'+project.id+'.json')
        .success(function (data) {
          if( data ) {
            var msg = '¿Estás seguro que quieres eliminar este proyecto?';
            if( data.members.length > 1 )
              msg = 'Este proyecto es compartido con otros usuarios. ¿Seguro que quieres eliminar este proyecto?';

            if(confirm(msg)) {
              $http.delete('/projects/' + data.id)
                  .success(function(){
                    $scope.messages = { response: true, message: "El proyecto fue eliminado!"}
                    get_projects();
                  })
                  .error(function(){
                    $scope.messages = { response: false, message: "Error mientras se eliminaba el proyecto!"}
                  });
            }
          }
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error mientras se eliminaba el proyecto!"}
        });
  }

  $scope.user_permission = function(project) {
    get_project_info(project)

    $aside.open({
      templateUrl: 'user-permission-aside',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          send_invitations(project);
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

  function send_invitations(project) {
    $http.post('projects/'+ project.id +'/share', $scope.share)
        .success(function(data){
          $scope.messages = {response: true, message: "Compartido con usuarios"}
          $scope.share = {share_users: "", message: ""}
        })
        .error(function(){
          $scope.messages = {response: false, message: "Error mientras se compartía"}
        })
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }

}])