class CreateJoinTableActorObjective < ActiveRecord::Migration
  def change
    create_join_table :actors, :objectives do |t|
      # t.index [:actor_id, :objective_id]
      # t.index [:objective_id, :actor_id]
    end
  end
end
