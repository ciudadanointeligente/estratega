json.extract! @activity, :id, :objective_id, :title, :description, :event_title, :place
if @activity.indicator
    json.indicator_id @activity.indicator.id
end