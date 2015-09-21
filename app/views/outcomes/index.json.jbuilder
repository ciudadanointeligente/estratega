json.array!(@outcomes) do |o|
	json.extract! o, :title, :description, :objective_id, :created_at, :updated_at, :outcome_type_id, :actor_type_id, :categorie
	json.no_activities o.activities.count
end