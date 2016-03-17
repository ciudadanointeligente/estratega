class RenameColumnSchedulingToStartDateFromActivity < ActiveRecord::Migration
  def change
    rename_column :activities, :scheduling, :start_date
  end
end
