class RemoveActivityFromAsks < ActiveRecord::Migration
  def change
    remove_column :asks, :activity_id
  end
end
