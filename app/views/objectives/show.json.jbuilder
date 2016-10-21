json.merge! @objective.attributes
if @objective.cached_indicator
    json.indicator_id @objective.cached_indicator.id
end
