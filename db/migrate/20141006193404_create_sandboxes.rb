class CreateSandboxes < ActiveRecord::Migration
  def change
    create_table :sandboxes do |t|
      t.string :name
      t.string :description
      t.string :data

      t.timestamps
    end
  end
end
