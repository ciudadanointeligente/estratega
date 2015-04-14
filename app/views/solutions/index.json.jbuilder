json.array!(@solutions) do |solution|
  json.extract! solution, :id, :title, :description, :policy_problem_id
  json.url solution_url(solution, format: :json)
end
