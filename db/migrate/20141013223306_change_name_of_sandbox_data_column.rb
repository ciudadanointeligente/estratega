class ChangeNameOfSandboxDataColumn < ActiveRecord::Migration
  def change
    rename_column :sandboxes, :data, :graph_data
  end
end
