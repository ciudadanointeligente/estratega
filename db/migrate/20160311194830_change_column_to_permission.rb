class ChangeColumnToPermission < ActiveRecord::Migration
  def change
      change_column_default :permissions, :role, :default => :owner
  end
end
