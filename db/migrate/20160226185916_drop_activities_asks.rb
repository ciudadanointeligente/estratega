class DropActivitiesAsks < ActiveRecord::Migration
  def change
     drop_table :activities_asks
  end
end
