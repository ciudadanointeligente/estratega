class CreateProject < ActiveRecord::Migration
  def change
    create_table :project do |t|
      t.string :title
      t.text :description

      t.timestamps
    end
  end
end
