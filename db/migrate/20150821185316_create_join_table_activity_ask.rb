class CreateJoinTableActivityAsk < ActiveRecord::Migration
  def change
    create_join_table :activities, :asks do |t|
      # t.index [:activity_id, :ask_id]
      # t.index [:ask_id, :activity_id]
    end
  end
end
