class CreatePermissions < ActiveRecord::Migration
  def change
    create_table :permissions do |t|
      t.references :project, index: true, foreign_key: true
      t.references :user
      t.integer :role

      t.timestamps null: false
    end
  end
end
