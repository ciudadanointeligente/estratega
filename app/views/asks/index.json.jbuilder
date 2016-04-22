json.array!(@asks) do |ask|
  json.extract! ask, :id, :description, :objective_id, :execution, :person_in_charge, :outcome_id
  messages = []
  ask.messages.each do |m|
    obj = {id: m.id, description: m.description, executed: m.executed, actor: m.actor, activity: m.activity, created_at: m.created_at}
    messages << obj
  end
  json.messages messages
  if ask.indicator
    json.indicator_id ask.indicator.id
  end
end