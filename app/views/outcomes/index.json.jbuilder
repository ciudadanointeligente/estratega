json.array!(@outcomes) do |o|
	json.extract! o, :id, :title, :description, :objective_id, :created_at, :updated_at, :outcome_type_id, :actor_type_id, :categorie
	if o.indicator
    	json.indicator_id o.indicator.id
    end
end