class ChangeColumnToPermission < ActiveRecord::Migration
  def change
      change_column_default :permissions, :role, :integer, :default => :owner
  end
end
