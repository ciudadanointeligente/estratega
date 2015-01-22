class AddPublicToSandboxes < ActiveRecord::Migration
  def change
  	add_column :sandboxes, :public, :boolean
  end
end
