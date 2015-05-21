class AddFocusAreaToRealProblems < ActiveRecord::Migration
  def change
  	add_column :real_problems, :focus_area, :text
  end
end
