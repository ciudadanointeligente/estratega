members = []
json.extract! @project, :id, :title, :description, :public, :focus_area, :created_at, :updated_at
if @project.real_problem
    json.real_problem_id @project.real_problem.id
end
@project.users.each do |u|
  permission = Permission.where(project_id: @project.id ).where(user_id: u.id).first
  members << {id: u.id, email: u.email, role: permission.role }
end
json.members members