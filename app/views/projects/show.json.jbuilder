json.extract! @project, :id, :title, :description, :public, :created_at, :updated_at
if @project.real_problem
    json.real_problem_id @project.real_problem.id
end