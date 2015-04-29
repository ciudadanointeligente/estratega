json.array!(@policy_problems) do |policy_problem|
  json.extract! policy_problem, :id, :title, :description, :real_problem_id
  json.url policy_problem_url(policy_problem, format: :json)
end
