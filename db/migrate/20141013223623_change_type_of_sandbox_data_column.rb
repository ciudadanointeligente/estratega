class ChangeTypeOfSandboxDataColumn < ActiveRecord::Migration
  def change
    change_column :sandboxes, :graph_data, :text
  end
end
