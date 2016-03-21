class AddProjectRefToActivity < ActiveRecord::Migration
  def change
    add_reference :activities, :project, index: true, foreign_key: true
  end
end
