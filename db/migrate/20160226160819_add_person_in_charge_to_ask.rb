class AddPersonInChargeToAsk < ActiveRecord::Migration
  def change
    add_column :asks, :person_in_charge, :string
  end
end
