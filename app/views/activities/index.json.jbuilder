json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :description, :completion, :organizer, :scheduling, :outcome_ids, :ask_ids
end
