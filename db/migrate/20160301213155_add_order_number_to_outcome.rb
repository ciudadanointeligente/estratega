class AddOrderNumberToOutcome < ActiveRecord::Migration
  def change
    add_column :outcomes, :order_number, :integer
  end
end
