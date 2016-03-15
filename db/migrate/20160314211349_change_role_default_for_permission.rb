class ChangeRoleDefaultForPermission < ActiveRecord::Migration
  def change
    change_column_default :permissions, :role, from: nil, to: :owner
  end
end
