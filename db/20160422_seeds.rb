Organization.create!([
  {name: "repollo", email: "jbari@votainteligente.cl", subdomain: "repollo", max_projects: "2", logo_file_name: nil, logo_content_type: nil, logo_file_size: nil, logo_updated_at: nil}
])
User.create!([
  {email: "jbari@votainteligente.cl", encrypted_password: "$2a$10$46kPprOeYsPTYfXgoKjFc.AcRcgT64jYZYcPDU0mDQ4m0Fbk0brwK", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 39, current_sign_in_at: "2016-04-22 14:35:29", last_sign_in_at: "2016-04-22 13:59:17", current_sign_in_ip: "186.107.111.194", last_sign_in_ip: "186.107.111.194", role: nil},
  {email: "dgarrido@ciudadanoi.org", encrypted_password: "$2a$10$apNoIrhShG3z7CUgHFTeo.NHrEb/DfvqS7jCq3SH3MhrvcXRWRtSm", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 2, current_sign_in_at: "2016-03-31 20:43:06", last_sign_in_at: "2016-03-15 21:21:23", current_sign_in_ip: "190.160.200.98", last_sign_in_ip: "201.188.21.148", role: nil},
  {email: "jbari@ciudadanoi.org", encrypted_password: "$2a$10$YzpZQATCrQPvmLZTmXfJ8OUBLtQQQGimgcQK/LzVJvR493Nvq9jjK", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: nil, sign_in_count: 2, current_sign_in_at: "2016-03-18 20:49:46", last_sign_in_at: "2016-03-18 18:27:59", current_sign_in_ip: "186.106.250.226", last_sign_in_ip: "186.106.250.226", role: nil},
  {email: "jordi@ciudadanoi.org", encrypted_password: "$2a$10$SU8hGOOkO1KrCzwqUciuUuAFbHSZXb9PG3ev6py7MmIg47scvgQvG", reset_password_token: "af101a500564f0c03c07b378e39bf988a3691b3ecff76f39103725cbfd378ab1", reset_password_sent_at: "2016-04-19 23:43:49", remember_created_at: nil, sign_in_count: 3, current_sign_in_at: "2016-03-19 19:20:44", last_sign_in_at: "2016-03-19 18:14:50", current_sign_in_ip: "190.163.154.209", last_sign_in_ip: "190.163.154.209", role: 2}
])
Activity.create!([
  {title: "actitulo1", description: "dactitulo1 dddddddddddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd  ddddddddddddddddddd nnnnnnnnnnnnnnnn nnnnnnnnnnnn nnnnnnn dactitulo1 dddddddddddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd nnnnnnnnnnnnnnnn nnnnnnnnnnnn nnnnnnn dactitulo1 dddddddddddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd nnnnnnnnnnnnnnnn nnnnnnnnnnnn nnnnnnndactitulo1 dddddddddddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd ddddddddddddddddddd nnnnnnnnnnnnnnnn nnnnnnnnnnnn nnnnnnn", objective_id: 3, start_date: "2016-02-18", completion: false, organizer: "Evento Externo", activity_types: "Demostración de proyectos o pilotos", event_title: nil, project_id: nil, end_date: nil, place: nil},
  {title: "MyText", description: "MyText", objective_id: nil, start_date: nil, completion: nil, organizer: nil, activity_types: nil, event_title: nil, project_id: 5, end_date: nil, place: nil},
  {title: "MyText", description: "MyText", objective_id: nil, start_date: nil, completion: nil, organizer: nil, activity_types: nil, event_title: nil, project_id: 6, end_date: nil, place: nil},
  {title: nil, description: "activity_test_20160330", objective_id: nil, start_date: nil, completion: nil, organizer: nil, activity_types: nil, event_title: nil, project_id: 11, end_date: nil, place: nil},
  {title: "", description: "activida", objective_id: nil, start_date: "2016-03-30", completion: false, organizer: nil, activity_types: "Lobby", event_title: nil, project_id: 4, end_date: "2016-04-02", place: "un lugar bonito"},
  {title: "", description: "asd", objective_id: nil, start_date: "2016-04-01", completion: false, organizer: nil, activity_types: "Fijar responsable político y candidato educación", event_title: nil, project_id: 4, end_date: "2016-04-05", place: "asd"},
  {title: "", description: "objetivo 1 actividad 1", objective_id: nil, start_date: nil, completion: false, organizer: nil, activity_types: "Litigios o defensa legal", event_title: nil, project_id: 2, end_date: nil, place: nil},
  {title: "", description: "objetivo 1 actividad 2", objective_id: nil, start_date: nil, completion: false, organizer: nil, activity_types: "Política de desarrollo de la propuesta", event_title: nil, project_id: 2, end_date: nil, place: nil},
  {title: "", description: "objetivo 1 actividad 3", objective_id: nil, start_date: nil, completion: false, organizer: nil, activity_types: "Lobby", event_title: nil, project_id: 2, end_date: nil, place: nil}
])
Activity::HABTM_Actors.create!([
  {activity_id: 1, actor_id: 2},
  {activity_id: 1, actor_id: 1},
  {activity_id: 19, actor_id: 10},
  {activity_id: 20, actor_id: 4},
  {activity_id: 21, actor_id: 4}
])
Actor.create!([
  {name: "ascao", description: "grande", actor_type: "Persona", support: 2, influence: 2, important: true},
  {name: "buenaventura durruti", description: "grandee", actor_type: "Persona", support: 2, influence: 2, important: true},
  {name: "wwf", description: "", actor_type: "Organización", support: -2, influence: 2, important: nil},
  {name: "actor #1", description: "", actor_type: "Persona", support: 2, influence: 2, important: true},
  {name: "humano", description: "", actor_type: "Persona", support: nil, influence: nil, important: nil},
  {name: "marciano", description: "", actor_type: "Organización", support: nil, influence: nil, important: nil},
  {name: "weon", description: "", actor_type: "Persona", support: nil, influence: nil, important: nil},
  {name: "jj", description: "", actor_type: "", support: nil, influence: nil, important: false},
  {name: "actor_test_20160330", description: nil, actor_type: nil, support: nil, influence: nil, important: nil},
  {name: "actor_test_20160330", description: nil, actor_type: nil, support: nil, influence: nil, important: nil},
  {name: "actor 1", description: "", actor_type: "Persona", support: -1, influence: 2, important: nil},
  {name: "actor 2", description: "", actor_type: "Organización", support: nil, influence: nil, important: nil},
  {name: "actor 3", description: "", actor_type: "Organización", support: nil, influence: nil, important: nil},
  {name: "actor 4", description: "", actor_type: "Persona", support: nil, influence: nil, important: nil}
])
Actor::HABTM_Objectives.create!([
  {actor_id: 4, objective_id: 6},
  {actor_id: 11, objective_id: 1},
  {actor_id: 12, objective_id: 1},
  {actor_id: 13, objective_id: 1},
  {actor_id: 14, objective_id: 1}
])
Actor::HABTM_Activities.create!([
  {activity_id: 1, actor_id: 2},
  {activity_id: 1, actor_id: 1},
  {activity_id: 19, actor_id: 10},
  {activity_id: 20, actor_id: 4},
  {activity_id: 21, actor_id: 4}
])
Actor::HABTM_Asks.create!([
  {ask_id: 40, actor_id: 9}
])
Ask.create!([
  {description: "p1", objective_id: 1, execution: nil, outcome_id: nil, person_in_charge: nil},
  {description: "p2", objective_id: 1, execution: nil, outcome_id: nil, person_in_charge: nil},
  {description: "p3", objective_id: 1, execution: nil, outcome_id: nil, person_in_charge: nil},
  {description: "peticiń #1", objective_id: 6, execution: nil, outcome_id: 112, person_in_charge: nil},
  {description: "petición #2", objective_id: 6, execution: nil, outcome_id: 113, person_in_charge: nil},
  {description: "petición #2", objective_id: 6, execution: nil, outcome_id: 113, person_in_charge: nil},
  {description: "asdasd", objective_id: 6, execution: nil, outcome_id: 113, person_in_charge: nil},
  {description: "ask_test_20160330", objective_id: nil, execution: nil, outcome_id: 117, person_in_charge: nil},
  {description: "ask_test_20160330", objective_id: nil, execution: nil, outcome_id: 119, person_in_charge: nil},
  {description: "d", objective_id: nil, execution: nil, outcome_id: 120, person_in_charge: nil},
  {description: "objetivo 1 result 1 peticion 1", objective_id: 1, execution: nil, outcome_id: 1, person_in_charge: "e1"},
  {description: "objetivo 1 result 1 peticion 2", objective_id: 1, execution: nil, outcome_id: 1, person_in_charge: "e2"},
  {description: "objetivo 1 result 2 peticion 1", objective_id: 1, execution: nil, outcome_id: 121, person_in_charge: nil},
  {description: "objetivo 1 result 2 peticion 2", objective_id: 1, execution: nil, outcome_id: 121, person_in_charge: "w2"}
])
Ask::HABTM_Actors.create!([
  {ask_id: 40, actor_id: 9}
])
Indicator.create!([
  {owner_name: "oi1", owner_role: "oi1", expected_results: "oi1", obtained_results: "oi1", settings: "oi1", activity_id: nil, percentage: 66, objective_id: 1, outcome_id: nil, ask_id: nil},
  {owner_name: "ai111111111111111", owner_role: "ai1", expected_results: "ai1", obtained_results: "ai1", settings: "ai1", activity_id: nil, percentage: 22, objective_id: nil, outcome_id: nil, ask_id: 1},
  {owner_name: "ai2", owner_role: "ai2", expected_results: "ai2", obtained_results: "ai2", settings: "ai2", activity_id: nil, percentage: 77, objective_id: nil, outcome_id: nil, ask_id: 2},
  {owner_name: "ia1", owner_role: "ia1", expected_results: "ia1", obtained_results: "ia1", settings: "ia1", activity_id: 1, percentage: 44, objective_id: nil, outcome_id: nil, ask_id: nil},
  {owner_name: "asd", owner_role: "asd", expected_results: "asd", obtained_results: "asd", settings: "asd", activity_id: 20, percentage: 60, objective_id: nil, outcome_id: nil, ask_id: nil},
  {owner_name: "", owner_role: "", expected_results: "", obtained_results: "", settings: "", activity_id: 21, percentage: 45, objective_id: nil, outcome_id: nil, ask_id: nil}
])
Message.create!([
  {description: "m1", executed: false, ask_id: 1, actor_id: nil},
  {description: "m2", executed: true, ask_id: 2, actor_id: nil},
  {description: "m21", executed: false, ask_id: 2, actor_id: nil},
  {description: "message_test_20160330", executed: false, ask_id: 40, actor_id: 10},
  {description: "mensaje", executed: true, ask_id: 33, actor_id: 4},
  {description: "otro msj", executed: false, ask_id: 33, actor_id: 4},
  {description: "objetivo 1 result 1 peticion 2 mensaje 1", executed: false, ask_id: 43, actor_id: nil},
  {description: "objetivo 1 result 1 peticion 2 mensaje 2", executed: false, ask_id: 43, actor_id: nil},
  {description: "objetivo 1 result 2 peticion 1 mensaje 1", executed: false, ask_id: 44, actor_id: nil},
  {description: "objetivo 1 result 2 peticion 1 mensaje 2", executed: false, ask_id: 44, actor_id: nil},
  {description: "objetivo 1 result 2 peticion 2 mensaje 1", executed: false, ask_id: 45, actor_id: nil},
  {description: "objetivo 1 result 2 peticion 2 mensaje 2", executed: false, ask_id: 45, actor_id: nil},
  {description: "objetivo 1 result 1 peticion 1 mensaje 1", executed: false, ask_id: 42, actor_id: 13},
  {description: "objetivo 1 result 1 peticion 1 mensaje 2", executed: false, ask_id: 42, actor_id: 11}
])
Objective.create!([
  {title: "objetivo 1", description: "", prioritized: true, project_id: 2, barriers: [], enabling_factors: [], big_difference_score: nil, big_difference_arguments: nil, multiplying_effect_score: nil, multiplying_effect_arguments: nil, catalytic_score: nil, catalytic_arguments: nil, demand_score: nil, demand_arguments: nil, hooks_processes_score: nil, hooks_processes_arguments: nil, intuitive_score: nil, intuitive_arguments: nil, alignment_score: nil, alignment_arguments: nil, loss_gain_score: nil, loss_gain_arguments: nil, added_value_score: nil, added_value_arguments: nil, objective_type: "Desarrollo de políticas públicas", theory_of_change: nil, completion_mark: nil},
  {title: "objetivo #1", description: "", prioritized: true, project_id: 4, barriers: ["barrera #1"], enabling_factors: ["factor habilitante #1"], big_difference_score: 1, big_difference_arguments: nil, multiplying_effect_score: 3, multiplying_effect_arguments: nil, catalytic_score: 1, catalytic_arguments: nil, demand_score: nil, demand_arguments: nil, hooks_processes_score: nil, hooks_processes_arguments: nil, intuitive_score: nil, intuitive_arguments: nil, alignment_score: nil, alignment_arguments: nil, loss_gain_score: nil, loss_gain_arguments: nil, added_value_score: nil, added_value_arguments: nil, objective_type: nil, theory_of_change: "{\"selected\":null,\"templates\":[{\"type\":\"container\",\"id\":1,\"label\":\"Agrupador\",\"elements\":[[]]}],\"dropzones\":[[{\"id\":112,\"title\":\"&nbsp;\",\"description\":\"resultado intermedio #1\",\"objective_id\":6,\"created_at\":\"2016-03-15T21:26:21.242Z\",\"updated_at\":\"2016-03-15T21:26:21.242Z\",\"outcome_type_id\":\"Voluntad política\",\"actor_type_id\":null,\"categorie\":null,\"$$hashKey\":\"00T\"},{\"id\":113,\"title\":\"&nbsp;\",\"description\":\"reusltado intermedio #2\",\"objective_id\":6,\"created_at\":\"2016-03-15T21:26:37.963Z\",\"updated_at\":\"2016-03-15T21:26:37.963Z\",\"outcome_type_id\":\"Relevancia\",\"actor_type_id\":null,\"categorie\":null}]]}", completion_mark: nil},
  {title: "objective_test_20100330", description: nil, prioritized: nil, project_id: 11, barriers: [], enabling_factors: [], big_difference_score: nil, big_difference_arguments: nil, multiplying_effect_score: nil, multiplying_effect_arguments: nil, catalytic_score: nil, catalytic_arguments: nil, demand_score: nil, demand_arguments: nil, hooks_processes_score: nil, hooks_processes_arguments: nil, intuitive_score: nil, intuitive_arguments: nil, alignment_score: nil, alignment_arguments: nil, loss_gain_score: nil, loss_gain_arguments: nil, added_value_score: nil, added_value_arguments: nil, objective_type: nil, theory_of_change: nil, completion_mark: nil}
])
Objective::HABTM_Actors.create!([
  {actor_id: 4, objective_id: 6},
  {actor_id: 11, objective_id: 1},
  {actor_id: 12, objective_id: 1},
  {actor_id: 13, objective_id: 1},
  {actor_id: 14, objective_id: 1}
])
Outcome.create!([
  {title: "&nbsp;", description: "resultado intermedio #1", objective_id: 6, outcome_type_id: "Voluntad política", actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "&nbsp;", description: "reusltado intermedio #2", objective_id: 6, outcome_type_id: "Relevancia", actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "outcome_test_20160330", description: nil, objective_id: 8, outcome_type_id: nil, actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "outcome_test_20160330", description: nil, objective_id: nil, outcome_type_id: nil, actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "outcome_test_20160330", description: nil, objective_id: 9, outcome_type_id: nil, actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "w", description: nil, objective_id: nil, outcome_type_id: nil, actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "&nbsp;", description: "objetivo 1 result 1", objective_id: 1, outcome_type_id: "Replanteamiento del asunto", actor_type_id: nil, categorie: nil, completion_mark: nil},
  {title: "&nbsp;", description: "objetivo 1 result 2", objective_id: 1, outcome_type_id: nil, actor_type_id: nil, categorie: nil, completion_mark: nil}
])
Permission.create!([
  {project_id: 2, user_id: 1, role: 0},
  {project_id: 4, user_id: 2, role: 0}
])
PolicyProblem.create!([
  {title: "A policy problem", description: "a description for a problem", real_problem_id: 1},
  {title: "politica publica #1", description: "&nbsp;", real_problem_id: 4}
])
Project.create!([
  {title: "A demo Project", description: "a description of a project", public: true, focus_area: "Reduce child mortality"},
  {title: "t1", description: "d1", public: true, focus_area: "area1"},
  {title: "proyecto #1", description: "", public: false, focus_area: ""},
  {title: "My Project", description: "My Project Description", public: false, focus_area: nil},
  {title: "My Project", description: "My Project Description", public: false, focus_area: nil},
  {title: "My Project", description: "My Project Description", public: false, focus_area: nil},
  {title: "My Project", description: "My Project Description", public: false, focus_area: nil},
  {title: "test_20160330", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil},
  {title: "r", description: nil, public: nil, focus_area: nil}
])
RealProblem.create!([
  {title: "A real world problem", description: "a description of a real problem", project_id: 1, focus_area: nil, goal: "a goal for a real problem"},
  {title: ".", description: nil, project_id: 2, focus_area: nil, goal: "m1"},
  {title: "asd", description: "zxc", project_id: 4, focus_area: nil, goal: "la meta!"}
])
Solution.create!([
  {title: "A solution", description: "a description for a solution", policy_problem_id: 1},
  {title: "solucion #1", description: "&nbsp;", policy_problem_id: 4}
])
