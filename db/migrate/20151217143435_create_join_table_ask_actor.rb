class CreateJoinTableAskActor < ActiveRecord::Migration
  def change
    remove_column :asks, :actor_id, :integer
    create_join_table :asks, :actors do |t|
      # t.index [:ask_id, :actor_id]
      # t.index [:actor_id, :ask_id]
    end
  end
end
