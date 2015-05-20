class ChangeFieldsTypeToOutcomes < ActiveRecord::Migration
  def change
  	change_column :outcomes, :outcome_type_id, :text
  	change_column :outcomes, :actor_type_id, :text
  end
end
