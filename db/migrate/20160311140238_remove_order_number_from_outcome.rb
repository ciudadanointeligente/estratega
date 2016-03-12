class RemoveOrderNumberFromOutcome < ActiveRecord::Migration
  def change
    remove_column :outcomes, :order_number
  end
end
