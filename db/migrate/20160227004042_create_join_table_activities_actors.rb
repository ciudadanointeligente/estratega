class CreateJoinTableActivitiesActors < ActiveRecord::Migration
  def change
    create_join_table :activities, :actors do |t|
      # t.index [:activity_id, :actor_id]
      # t.index [:actor_id, :activity_id]
    end
  end
end
