class ChangeDefaultForPermission < ActiveRecord::Migration
  def change
    change_column :permissions, :role, :integer, :default => :owner
  end
end
