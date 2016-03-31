class AddPlaceToActivity < ActiveRecord::Migration
  def change
    add_column :activities, :place, :string
  end
end
