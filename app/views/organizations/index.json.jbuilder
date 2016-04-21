json.array!(@organizations) do |organization|
  json.extract! organization, :id, :mane, :email, :subdomain, :max_projects
  json.url organization_url(organization, format: :json)
end
