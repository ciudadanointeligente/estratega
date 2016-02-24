class DropActorsMessages < ActiveRecord::Migration
  def change
    drop_table :actors_messages
  end
end
