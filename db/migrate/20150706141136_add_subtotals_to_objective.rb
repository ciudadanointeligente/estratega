class AddSubtotalsToObjective < ActiveRecord::Migration
  def change
  	add_column :objectives, :key_contribution, :int
  	add_column :objectives, :momentum, :int
  	add_column :objectives, :comparative_advantage, :int
  end
end
