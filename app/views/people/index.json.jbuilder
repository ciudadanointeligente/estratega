json.array!(@people) do |person|
  json.extract! person, :id, :name, :alternate_name, :email, :gender, :birth_date, :death_date, :image, :summary, :biography
  json.url person_url(person, format: :json)
end
