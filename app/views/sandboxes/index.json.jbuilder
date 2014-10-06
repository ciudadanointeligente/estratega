json.array!(@sandboxes) do |sandbox|
  json.extract! sandbox, :id, :name, :description, :data
  json.url sandbox_url(sandbox, format: :json)
end
