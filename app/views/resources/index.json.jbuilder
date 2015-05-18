json.array!(@resources) do |resource|
  json.extract! resource, :id, :title, :description, :tag_list, :public, :link, :project_id, :created_at, :updated_at
  json.url project_resource_url(@project, resource, format: :json)
end
