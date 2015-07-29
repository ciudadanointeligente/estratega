class AddImportantToActors < ActiveRecord::Migration
  def change
    add_column :actors, :important, :boolean
  end
end
