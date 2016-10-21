members = []
json.extract! @project, :id, :title, :description, :public, :focus_area, :created_at, :updated_at
if @project.cached_real_problem
    json.real_problem_id @project.cached_real_problem.id
end
@project.cached_users.each do |u|
  #permission = Permission.where(project_id: @project.id ).where(user_id: u.id).first
  permission = Permission.cached_find(@project.id, u.id)
  members << {id: u.id, email: u.email, role: permission.role }
end
json.members members
