class RemoveProjectIdFromActivities < ActiveRecord::Migration
  def change
    remove_column :activities, :project_id, :integer
  end
end
