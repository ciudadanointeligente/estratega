class AddProjectRefToRealProblems < ActiveRecord::Migration
  def change
    add_reference :real_problems, :project, index: true
  end
end
