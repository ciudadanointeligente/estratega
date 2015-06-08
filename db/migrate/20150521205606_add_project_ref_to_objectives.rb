class AddProjectRefToObjectives < ActiveRecord::Migration
  def change
    add_reference :objectives, :project, index: true
  end
end
