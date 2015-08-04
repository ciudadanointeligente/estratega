class AddFocusAreaToProject < ActiveRecord::Migration
  def change
    add_column :projects, :focus_area, :string
  end
end
