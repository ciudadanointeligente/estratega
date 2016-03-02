class AddContainerToOutcome < ActiveRecord::Migration
  def change
    add_column :outcomes, :container, :integer
  end
end
