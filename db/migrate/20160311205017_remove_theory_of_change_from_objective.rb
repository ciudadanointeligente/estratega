class RemoveTheoryOfChangeFromObjective < ActiveRecord::Migration
  def change
    remove_column :objectives, :theory_of_change
  end
end
