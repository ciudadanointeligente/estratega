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
        $scope.messages = { response: false, message: "Error getting projects."}
      })
  }

  function get_public_projects() {
    $http.get('/projects.json?public=true')
      .success(function(data){
        $scope.public_projects = data;
      })
      .error(function(){
        $scope.messages = { response: false, message: "Error getting public projects."}
      })
  }

  get_projects();
  get_public_projects()

  function save_or_update_project() {

    if( $scope.current_project.id ) {
      $http.put('/projects/' + $scope.current_project.id, $scope.current_project)
        .success(function (data){
          $scope.messages = { response: true, message: "Project Updated!"}
        })
        .error(function(){
          $scope.messages = { response: false, message: "Error updating project!"}
        });
    } else {
      $http.post('/projects', $scope.current_project)
        .success(function (data){
          $scope.messages = { response: true, message: "Project created!"}
        })
        .error(function(error){
          $scope.messages = { response: false, message: error.errors.base[0] }
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
          $scope.messages = { response: false, message: "Error getting data!!!"}
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
            var msg = '¿Are you sure to delete this project?';
            if( data.members.length > 1 )
              msg = 'This project is shared. ¿Are you sure to delete this project?';


            if(confirm(msg)) {
              $http.delete('/projects/' + data.id)
                  .success(function(){
                    $scope.messages = { response: true, message: "Project deleted!"}
                    get_projects();
                  })
                  .error(function(){
                    $scope.messages = { response: false, message: "Error deleting project!"}
                  });
            }
          }
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error deleting project!"}
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
          $scope.messages = {response: true, message: "Shared with users"}
          $scope.share = {share_users: "", message: ""}
        })
        .error(function(){
          $scope.messages = {response: false, message: "Error while sharing"}
        })
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }


  $scope.delete_shared_user = function (user){
    var msg = '¿Sure you want to delete this collaborator?';

    if(confirm(msg)) {
      $http.delete('/projects/'+$scope.current_project.id+'/unshare?user_id='+user.id)
        .success(function (data) {
          get_project_info($scope.current_project)
        })
        .error(function (){
          $scope.messages = { response: false, message: "Error while unlinking user!"}
        })
    }
  }

}])
