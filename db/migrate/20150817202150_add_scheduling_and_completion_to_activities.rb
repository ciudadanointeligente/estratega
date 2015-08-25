class AddSchedulingAndCompletionToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :scheduling, :datetime
    add_column :activities, :completion, :boolean
  end
end
