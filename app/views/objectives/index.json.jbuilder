json.array!(@objectives) do |objective|
  json.extract! objective, :id, :title, :description, :prioritized, :objective_type
  json.url project_objective_url(@project, objective, format: :json)
  json.solution_ids objective.solution_ids

	json.big_difference_score objective.big_difference_score
	json.big_difference_arguments objective.big_difference_arguments

	json.multiplying_effect_score objective.multiplying_effect_score
	json.multiplying_effect_arguments objective.multiplying_effect_arguments

	json.catalytic_score objective.catalytic_score
	json.catalytic_arguments objective.catalytic_arguments

	json.demand_score objective.demand_score
	json.demand_arguments objective.demand_arguments

	json.hooks_processes_score objective.hooks_processes_score
	json.hooks_processes_arguments objective.hooks_processes_arguments

	json.intuitive_score objective.intuitive_score
	json.intuitive_arguments objective.intuitive_arguments

	json.alignment_score objective.alignment_score
	json.alignment_arguments objective.alignment_arguments

  json.added_value_score objective.added_value_score
  json.added_value_arguments objective.added_value_arguments

	json.loss_gain_score objective.loss_gain_score
	json.loss_gain_arguments objective.loss_gain_arguments

end
