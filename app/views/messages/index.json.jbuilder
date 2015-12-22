json.array!(@messages) do |m|
  json.extract! m, :id, :description
  actors = []
  m.actors.each do |a|
    actors << a.name
  end
  json.actors actors
end