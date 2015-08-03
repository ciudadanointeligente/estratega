json.array!(@projects) do |project|
  json.extract! project, :id, :title, :description, :focus_area, :public
end