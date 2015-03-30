class AddNameAndDescriptionToProject < ActiveRecord::Migration
  def change
    add_column :projects, :title, :string
    add_column :projects, :description, :text
    add_column :projects, :public, :boolean
  end
end
