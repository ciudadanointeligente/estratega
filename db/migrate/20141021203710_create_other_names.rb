class CreateOtherNames < ActiveRecord::Migration
  def change
    create_table :other_names do |t|
      t.string :name
      t.datetime :start_date
      t.datetime :end_date
      t.string :note

      t.timestamps
    end
  end
end
