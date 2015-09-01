class AddColumnToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :organizer, :string
  end
end
