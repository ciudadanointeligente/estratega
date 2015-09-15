class ChangeFieldTypeInActivities < ActiveRecord::Migration
  def change
  	change_column :activities, :scheduling, :date
  end
end
