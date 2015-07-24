class AddColumnsToObjectives < ActiveRecord::Migration
  def change
  	add_column :objectives, :big_difference_score, :int
  	add_column :objectives, :big_difference_arguments, :string

  	add_column :objectives, :multiplying_effect_score, :int
  	add_column :objectives, :multiplying_effect_arguments, :string

  	add_column :objectives, :catalytic_score, :int
  	add_column :objectives, :catalytic_arguments, :string

  	add_column :objectives, :demand_score, :int
  	add_column :objectives, :demand_arguments, :string
  	
  	add_column :objectives, :hooks_processes_score, :int
  	add_column :objectives, :hooks_processes_arguments, :string

  	add_column :objectives, :intuitive_score, :int
  	add_column :objectives, :intuitive_arguments, :string

  	add_column :objectives, :alignment_score, :int
  	add_column :objectives, :alignment_arguments, :string

  	add_column :objectives, :loss_gain_score, :int
  	add_column :objectives, :loss_gain_arguments, :string
  end
end
