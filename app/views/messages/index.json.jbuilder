json.array!(@messages) do |m|
  json.extract! m, :id, :message
  actors = []
  m.actors.each do |a|
    actors << a.name
  end
  json.actors actors
end