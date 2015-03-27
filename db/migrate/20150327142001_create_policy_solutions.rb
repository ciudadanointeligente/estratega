class CreatePolicySolutions < ActiveRecord::Migration
  def change
    create_table :policy_solutions do |t|
      t.text :title
      t.text :description
      t.references :policy_problem, index: true

      t.timestamps
    end
  end
end
