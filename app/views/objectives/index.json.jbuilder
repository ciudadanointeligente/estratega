json.array!(@objectives) do |objective|
  json.extract! objective, :id, :title, :description
  json.url project_objective_url(@project, objective, format: :json)
  json.solution_ids objective.solution_ids
end
