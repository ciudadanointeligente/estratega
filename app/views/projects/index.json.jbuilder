json.array!(@projects) do |project|
  json.extract! project, :id, :title, :description, :focus_area, :public
  project.permissions.map { |k, v|
    if k.user_id == current_user.id
      json.permission k.role
    end
  }
end