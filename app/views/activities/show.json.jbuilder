json.extract! @activity, :id, :title, :description, :event_title, :created_at, :updated_at
if @activity.indicator
    json.indicator_id @activity.indicator.id
end