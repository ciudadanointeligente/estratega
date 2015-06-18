class AddCategorieToOutcomes < ActiveRecord::Migration
  def change
	  add_column :outcomes, :categorie, :string
  end
end
