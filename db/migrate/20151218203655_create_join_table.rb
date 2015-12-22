class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :messages, :actors do |t|
      # t.index [:message_id, :actor_id]
      # t.index [:actor_id, :message_id]
    end
  end
end
