json.extract! @project, :id, :title, :description, :public, :focus_area, :created_at, :updated_at
if @project.real_problem
    json.real_problem_id @project.real_problem.id
end