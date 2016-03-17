json.array!(@activities) do |activity|
  json.extract! activity, :id, :title, :description, :completion, :organizer, :start_date, :end_date, :activity_types,  :event_title, :actor_ids
  if !activity.indicator.blank?
    json.indicator_id activity.indicator.id
  end
end
