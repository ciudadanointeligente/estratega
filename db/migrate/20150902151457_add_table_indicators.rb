class AddTableIndicators < ActiveRecord::Migration
  def change
    create_table :indicators do |t|
      t.string :owner_name
      t.string :owner_role
      t.text :expected_results
      t.text :obtained_results
      t.text :settings
      t.text :percentage
      t.references :activity, index: true

      t.timestamps
    end
  end
end
