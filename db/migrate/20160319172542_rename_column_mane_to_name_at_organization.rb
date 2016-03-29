class RenameColumnManeToNameAtOrganization < ActiveRecord::Migration
  def change
    rename_column :organizations, :mane, :name
  end
end
