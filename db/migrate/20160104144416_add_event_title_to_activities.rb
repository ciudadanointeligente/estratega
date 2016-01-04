class AddEventTitleToActivities < ActiveRecord::Migration
  def change
    add_column :activities, :event_title, :text
  end
end
