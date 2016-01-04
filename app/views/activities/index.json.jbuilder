json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :description, :completion, :organizer, :scheduling, :activity_types, :outcome_ids, :ask_ids, :event_title
  if !activity.indicator.blank?
    json.indicator_id activity.indicator.id
  end
end
