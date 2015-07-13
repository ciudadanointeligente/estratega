class AddActorRefToAsks < ActiveRecord::Migration
  def change
    add_reference :asks, :actor, index: true, foreign_key: true
  end
end
