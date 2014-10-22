class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :name
      t.string :email
      t.string :gender
      t.datetime :birth_date
      t.datetime :death_date
      t.string :image
      t.string :summary
      t.text :biography

      t.timestamps
    end
  end
end
