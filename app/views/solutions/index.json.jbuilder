json.array!(@solutions) do |solution|
  json.extract! solution, :id, :title, :description, :real_problem_id, :policy_problem_id
  json.objective_ids solution.objective_ids
end
