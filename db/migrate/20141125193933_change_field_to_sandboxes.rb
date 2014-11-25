class ChangeFieldToSandboxes < ActiveRecord::Migration
  def change
    change_column :sandboxes, :description, :text
  end
end
