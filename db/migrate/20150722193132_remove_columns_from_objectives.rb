class RemoveColumnsFromObjectives < ActiveRecord::Migration
  def change
  	remove_column :objectives, :key_contribution
  	remove_column :objectives, :momentum
  	remove_column :objectives, :comparative_advantage
  end
end
