class AddActivityTypesToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :activity_types, :string
  end
end
