class AddTheoryOfCangeToObjective < ActiveRecord::Migration
  def change
    add_column :objectives, :theory_of_change, :json
  end
end
