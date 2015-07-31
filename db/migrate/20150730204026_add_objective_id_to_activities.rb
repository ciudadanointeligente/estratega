class AddObjectiveIdToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :objective_id, :integer
  end
end
