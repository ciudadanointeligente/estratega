json.array!(@policy_solutions) do |policy_solution|
  json.extract! policy_solution, :id, :title, :description, :policy_problem_id
  json.url policy_solution_url(policy_solution, format: :json)
end
