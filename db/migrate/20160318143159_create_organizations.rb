class CreateOrganizations < ActiveRecord::Migration
  def change
    create_table :organizations do |t|
      t.string :mane
      t.string :email
      t.string :subdomain
      t.string :max_projects

      t.timestamps null: false
    end
  end
end
