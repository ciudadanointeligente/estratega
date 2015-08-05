class AddObjectiveRefToAsks < ActiveRecord::Migration
  def change
    add_reference :asks, :objective, index: true, foreign_key: true
  end
end
