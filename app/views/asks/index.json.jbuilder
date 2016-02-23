json.array!(@asks) do |ask|
  json.extract! ask, :id, :description, :objective_id, :execution
  messages = []
  ask.messages.each do |m|
    obj = {id: m.id, description: m.description, executed: m.executed, actors:[]}
    actors = []
    m.actors.each do |a|
      obj[:actors] << { name: a.name }
    end

    messages << obj
  end
  json.messages messages
  if ask.indicator
    json.indicator_id ask.indicator.id
  end
end