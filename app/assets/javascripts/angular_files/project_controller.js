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
        $scope.messages = { response: false, message: I18n.t('js_texts.error_getting_projects')}
      })
  }

  function get_public_projects() {
    $http.get('/projects.json?public=true')
      .success(function(data){
        $scope.public_projects = data;
      })
      .error(function(){
        $scope.messages = { response: false, message: I18n.t('js_texts.error_public_projects')}
      })
  }

  get_projects();
  get_public_projects()

  function save_or_update_project() {

    if( $scope.current_project.id ) {
      $http.put('/projects/' + $scope.current_project.id, $scope.current_project)
        .success(function (data){
          $scope.messages = { response: true, message: I18n.t('js_texts.project_updated')}
        })
        .error(function(){
          $scope.messages = { response: false, message: I18n.t('js_texts.project_delete_error')}
        });
    } else {
      $http.post('/projects', $scope.current_project)
        .success(function (data){
          $scope.messages = { response: true, message: I18n.t('js_texts.project_created')}
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
          $scope.messages = { response: false, message: I18n.t('js_texts.error_get_data')}
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
            var msg = I18n.t('js_texts.delete_confirmation');
            if( data.members.length > 1 )
              msg = I18n.t('js_texts.shared_project_delete_confirmation');


            if(confirm(msg)) {
              $http.delete('/projects/' + data.id)
                  .success(function(){
                    $scope.messages = { response: true, message:  I18n.t('js_texts.project_deleted')}
                    get_projects();
                  })
                  .error(function(){
                    $scope.messages = { response: false, message:  I18n.t('js_texts.project_delete_error')}
                  });
            }
          }
        })
        .error(function (){
          $scope.messages = { response: false, message:  I18n.t('js_texts.project_delete_error')}
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
          $scope.messages = {response: true, message:  I18n.t('js_texts.shared')}
          $scope.share = {share_users: "", message: ""}
        })
        .error(function(){
          $scope.messages = {response: false, message:  I18n.t('js_texts.share_error')}
        })
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }


  $scope.delete_shared_user = function (user){
    var msg =  I18n.t('js_texts.colaborator_delete_confirmation');

    if(confirm(msg)) {
      $http.delete('/projects/'+$scope.current_project.id+'/unshare?user_id='+user.id)
        .success(function (data) {
          get_project_info($scope.current_project)
        })
        .error(function (){
          $scope.messages = { response: false, message:  I18n.t('js_texts.unlinking_error')}
        })
    }
  }

}])
