class AddGoalToRealProblem < ActiveRecord::Migration
  def change
  	add_column :real_problems, :goal, :text 
  end
end
