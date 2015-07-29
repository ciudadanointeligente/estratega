class AddFieldToObjective < ActiveRecord::Migration
  def change
  	add_column :objectives, :added_value_score, :int
  	add_column :objectives, :added_value_arguments, :int
  end
end
