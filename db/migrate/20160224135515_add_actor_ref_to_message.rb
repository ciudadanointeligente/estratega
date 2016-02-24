class AddActorRefToMessage < ActiveRecord::Migration
  def change
    add_reference :messages, :actor, index: true, foreign_key: true
  end
end
