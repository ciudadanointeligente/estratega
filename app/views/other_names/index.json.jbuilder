json.array!(@other_names) do |other_name|
  json.extract! other_name, :id, :name, :start_date, :end_date, :note
  json.url other_name_url(other_name, format: :json)
end
