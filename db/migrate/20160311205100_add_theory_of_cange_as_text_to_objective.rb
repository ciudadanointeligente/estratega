class AddTheoryOfCangeAsTextToObjective < ActiveRecord::Migration
  def change
    add_column :objectives, :theory_of_change, :string
  end
end
