json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :description, :completion, :organizer, :scheduling, :activity_types, :outcome_ids,  :event_title, :actor_ids
  if !activity.indicator.blank?
    json.indicator_id activity.indicator.id
  end
end
