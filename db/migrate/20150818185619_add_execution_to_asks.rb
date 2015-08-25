class AddExecutionToAsks < ActiveRecord::Migration
  def change
    add_column :asks, :execution, :boolean
  end
end
