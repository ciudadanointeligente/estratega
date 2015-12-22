app.controller("stage5Ctrl", ["$scope", "$http", "$aside", "$location", "$attrs", function ($scope, $http, $aside, $location, $attrs) {
  $scope.project_id   = $location.path().split("/")[2];
  $scope.objective_id = $location.path().split("/")[4];

  $scope.outcomes    = [];
  $scope.asks = [];
  $scope.activities = [];

  $scope.messages = {response: "", message: ""}
  $scope.organizer = ["Evento Externo", "Evento de la Organización"];
  $scope.activity_types = [
    {type: "Voluntad Política", values: ["Lobby", "Construcción de relaciones con los tomadores de decisiones", "Fijar responsable político y candidato educación", "Litigios o defensa legal", "Política de desarrollo de la propuesta", "Demostración de proyectos o pilotos", "Ganar Medios"]},
    {type: "Voluntad Pública", values: ["Votación", "Convocatorias y marchas", "Medios de Comunicación Digital o basados en Internet / medios de comunicación social"]},
    {type: "Actitudes y creencias", values: ["Edición / análisis de políticas y investigación", "Votación", "Anuncios de servicio público", "Reuniones informativas / presentaciones"]},
    {type: "Relevancia", values: ["Lobby", "Construcción de relaciones con los tomadores de decisiones", "Fijar responsable político y candidato educación"]},
    {type: "Conciencia", values: ["Anuncios de servicio público", "Convocatorias y marchas", "Reuniones informativas / presentaciones", "Digital or internet-based media/social media"]},
    {type: "Nuevos campeones", values: ["Relationship building with decision-makers", "Medios de Comunicación Digital o basados en Internet / medios de comunicación social"]},
    {type: "Nuevos defensores", values: ["Reuniones informativas / presentaciones"]},
    {type: "Asociaciones y alianzas", values: ["Edición / análisis de políticas y investigación", "Convocatorias y marchas", "Bases de organización y movilización"]},
    {type: "Circunscripción o base de apoyo en crecimiento", values: ["Convocatorias y marchas", "Bases de organización y movilización"]},
    {type: "Cobertura mediática", values: ["Convocatorias y marchas", "bases de organización y movilización", "Asociaciones con medios", "Medios de Comunicación Digital o basados en Internet / medios de comunicación social"]},
    {type: "Replanteamiento del asunto", values: ["Edición / análisis de políticas y investigación", "Medios ganados"]},
    {type: "Visibilidad de la organización o reconocimiento del problema", values: ["Edición / análisis de políticas y investigación"]},
    {type: "Capacidad de advocacy de la organización", values: ["Cualquier otra"]}
  ];

  function get_outcomes(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/outcomes.json')
      .success(function (data){
        $scope.outcomes = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingoutcomes }
        scroll_to_top();
      });
  }

  function get_asks(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/asks.json')
      .success(function (data){
        $scope.asks = data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingasks }
        scroll_to_top();
      });
  }

  function get_activities(project_id, objective_id) {
    $http.get('/projects/'+project_id+'/objectives/'+objective_id+'/activities.json')
      .success(function (data) {
        var new_data = []
        data.forEach(function(d){
          d.percentage = 0;
          if (d.indicator_id) {
            $http.get('/activities/'+d.id+'/indicators/'+d.indicator_id+'.json')
                .success(function (indicator) {
                  d.percentage = indicator.percentage
                })
          }
          new_data.push(d)
        });
        $scope.activities = new_data;
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingactivities }
        scroll_to_top();
      });
  }

  get_outcomes($scope.project_id, $scope.objective_id);
  get_asks($scope.project_id, $scope.objective_id);
  get_activities($scope.project_id, $scope.objective_id);

  $scope.add_edit_activity = function(activity) {
    if (activity) {
      $scope.current_activity = activity;
    } else
      $scope.current_activity = {
        title: "",
        description: "",
        completion: false,
        scheduling: "",
        objective_id: $scope.objective_id,
        outcome_ids: [],
        ask_ids: []
      };

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
    if ($scope.current_activity.id) {
      $http.put('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities/' + $scope.current_activity.id, $scope.current_activity)
        .success(function (data) {
          // alert success or error
          get_activities($scope.project_id, $scope.objective_id)
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorupdatingactivity }
          scroll_to_top();
        });
    } else {
      $http.post('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities', $scope.current_activity)
        .success(function (data) {
          $scope.current_activity = data;
          get_activities($scope.project_id, $scope.objective_id)
        })
        .error(function (){
          $scope.messages = { response: false, message: $attrs.errorcreatingactivity }
          scroll_to_top();
        });
    }
  }

  $scope.delete_activity = function (activity) {
    if (confirm($attrs.confirmdeleteactivity)) {
      $http.delete('/projects/' + $scope.project_id + '/objectives/' + $scope.objective_id + '/activities/' + activity.id);
      $scope.activities.splice($scope.activities.indexOf(activity), 1);
    }
  }

  $scope.dismiss_modal = function(){
    $scope.messages = {response: "", message: ""}
  }

  $scope.get_outcome_names = function(outcome_ids, outcomes){
    var names = []
    for(k in outcome_ids) {
      for(o in outcomes) {
        if(outcomes[o].id == outcome_ids[k])
          names.push(outcomes[o].description)
      }
    }
    return names
  }

  $scope.add_edit_indicator = function(activity) {
    $scope.activity = activity;
    if(activity.indicator_id) {
      $http.get('/activities/'+activity.id+'/indicators/'+activity.indicator_id)
          .success(function(data){
            $scope.current_indicator = data;
          })
    } else
      $scope.current_indicator = {owner_name: "", owner_role: "", expected_results:"", obtained_results: "", settings: "", percentage: ""};

    $aside.open({
      templateUrl: 'indicator-aside.html',
      placement: 'left',
      size: 'lg',
      scope: $scope,
      controller: function ($scope, $modalInstance) {
        $scope.save = function (e) {
          save_or_update_indicator()
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

  var save_or_update_indicator = function() {
    if($scope.activity.indicator_id) {
      $http.put('/activities/'+$scope.activity.id+'/indicators/'+$scope.activity.indicator_id, $scope.current_indicator)
          .success(function(){
            $scope.messages = { response: true, message: "Indicator actualizado"}
            get_activities($scope.project_id, $scope.objective_id);
          })
          .error(function(){
            $scope.messages = { response: false, message: "Error al actualizar los resultados de información"}
            scroll_to_top();
          });
    } else {
      $http.post('/activities/'+$scope.activity.id+'/indicators/', $scope.current_indicator)
          .success(function(data){
            $scope.messages = { response: true, message: "Indicator añadido"}
            get_activities($scope.project_id, $scope.objective_id);
          })
          .error(function(){
            $scope.messages = { response: false, message: "Error al crear el indicador"}
            scroll_to_top();
          });
    }

  }

  $scope.get_ical = function(activity) {
    $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/activities/'+activity.id+'/generate_ical')
        .success( function(data){
          var blob = new Blob([data], {type: "text/calendar; charset=UTF-8;"})
          var url = window.URL.createObjectURL(blob);

          var elem_partial_calendar =  document.createElement('a');
            elem_partial_calendar.setAttribute("href", url);
            elem_partial_calendar.setAttribute("download", 'partial_calendar_ical.ics');

          document.body.appendChild(elem_partial_calendar);
          elem_partial_calendar.click();
          document.body.removeChild(elem_partial_calendar);
        })
  }

  $scope.get_full_calendar = function() {
    $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/generate_massive_ical')
        .success( function(data){
          var blob = new Blob([data], {type: "text/calendar; charset=UTF-8;"})
          var url = window.URL.createObjectURL(blob);

          var elem_full_calendar =  document.createElement('a');
            elem_full_calendar.setAttribute("href", url);
            elem_full_calendar.setAttribute("download", 'full_calendar_ical.ics');

          document.body.appendChild(elem_full_calendar);
          elem_full_calendar.click();
          document.body.removeChild(elem_full_calendar);
        })
  }

  /* calendar */
  $scope.options = {
      weekOffset: 1,
      constraints: {
          startDate: moment().subtract(1, 'months').format('YYYY-MM-15'),
          endDate: moment().add(2, 'months').format('YYYY-MM-15')
      }
  };

  $http.get('/projects/'+$scope.project_id+'/objectives/'+$scope.objective_id+'/activities.json')
      .success(function (data) {
        $scope.events = []
        data.forEach(function(d){
          $scope.events.push({ date: moment(d.scheduling, 'YYYY-MM-DD').format('LL'), title: d.title })
        })
      })
      .error(function (){
        $scope.messages = { response: false, message: $attrs.errorgettingactivities }
        scroll_to_top();
      });

  // $scope.showEvents = function(events) {
  //     console.log(events.map(function(e) { return e.title }).join("\n"));
  // };
  /* calendar */

}]);