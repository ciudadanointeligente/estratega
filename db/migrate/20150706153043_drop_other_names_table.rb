class DropOtherNamesTable < ActiveRecord::Migration
  def change
    drop_table :other_names
  end
end
