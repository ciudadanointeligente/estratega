class AddLinkToResources < ActiveRecord::Migration
  def change
    add_column :resources, :link, :string
  end
end
