json.array!(@sandboxes) do |sandbox|
  json.extract! sandbox, :id, :name, :description, :graph_data
  json.url sandbox_url(sandbox, format: :json)
end
