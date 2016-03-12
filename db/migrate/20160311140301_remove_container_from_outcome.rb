class RemoveContainerFromOutcome < ActiveRecord::Migration
  def change
    remove_column :outcomes, :container
  end
end
