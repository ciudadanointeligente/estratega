Project.create!([
  {title: "A demo Project", description: "a description of a project", public: true, focus_area: "Reduce child mortality"},
  {title: "t1", description: "d1", public: true, focus_area: "area1"}
])
Objective.create!([
  {title: "o1", description: "", prioritized: true, project_id: 2, barriers: [], enabling_factors: [], big_difference_score: nil, big_difference_arguments: nil, multiplying_effect_score: nil, multiplying_effect_arguments: nil, catalytic_score: nil, catalytic_arguments: nil, demand_score: nil, demand_arguments: nil, hooks_processes_score: nil, hooks_processes_arguments: nil, intuitive_score: nil, intuitive_arguments: nil, alignment_score: nil, alignment_arguments: nil, loss_gain_score: nil, loss_gain_arguments: nil, added_value_score: nil, added_value_arguments: nil, objective_type: "Desarrollo de políticas públicas"}
])
Ask.create!([
  {description: "p1", objective_id: 1, execution: nil, outcome_id: nil},
  {description: "p2", objective_id: 1, execution: nil, outcome_id: nil},
  {description: "p3", objective_id: 1, execution: nil, outcome_id: nil}
])
Indicator.create!([
  {owner_name: "oi1", owner_role: "oi1", expected_results: "oi1", obtained_results: "oi1", settings: "oi1", activity_id: nil, percentage: 66, objective_id: 1, outcome_id: nil, ask_id: nil},
  {owner_name: "ai111111111111111", owner_role: "ai1", expected_results: "ai1", obtained_results: "ai1", settings: "ai1", activity_id: nil, percentage: 22, objective_id: nil, outcome_id: nil, ask_id: 1},
  {owner_name: "ai2", owner_role: "ai2", expected_results: "ai2", obtained_results: "ai2", settings: "ai2", activity_id: nil, percentage: 77, objective_id: nil, outcome_id: nil, ask_id: 2}
])
Message.create!([
  {description: "m1", executed: false, ask_id: 1},
  {description: "m2", executed: true, ask_id: 2},
  {description: "m21", executed: false, ask_id: 2}
])

Outcome.create!([
  {title: "&nbsp;", description: "ri1", objective_id: 1, outcome_type_id: "Circunscripción o base de apoyo en crecimiento", actor_type_id: nil, categorie: nil}
])
PolicyProblem.create!([
  {title: "A policy problem", description: "a description for a problem", real_problem_id: 1}
])

RealProblem.create!([
  {title: "A real world problem", description: "a description of a real problem", project_id: 1, focus_area: nil, goal: "a goal for a real problem"},
  {title: ".", description: nil, project_id: 2, focus_area: nil, goal: nil}
])
Solution.create!([
  {title: "A solution", description: "a description for a solution", policy_problem_id: 1}
])
User.create!([
  {email: "jbari@votainteligente.cl",password:"pelotar1", encrypted_password: "$2a$10$4f5ZXYSyf5MQs.fNxETl../o.jVVAoL8flqZLC7RK8.RFPyxX1D4y", reset_password_token: nil, reset_password_sent_at: nil, remember_created_at: "2016-02-23 13:08:14", sign_in_count: 3, current_sign_in_at: "2016-02-23 18:46:15", last_sign_in_at: "2016-02-23 13:08:14", current_sign_in_ip: "190.160.200.98", last_sign_in_ip: "190.160.200.98", role: nil}
])
Permission.create!([
  {project_id: 2, user_id: 1, role: :owner}
])