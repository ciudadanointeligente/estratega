json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :description
end
