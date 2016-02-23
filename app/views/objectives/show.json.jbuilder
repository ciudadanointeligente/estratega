json.merge! @objective.attributes
if @objective.indicator
    json.indicator_id @objective.indicator.id
end