json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :description, :completion, :scheduling, :outcome_ids
end
