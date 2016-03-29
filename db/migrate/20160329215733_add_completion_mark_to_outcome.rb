class AddCompletionMarkToOutcome < ActiveRecord::Migration
  def change
    add_column :outcomes, :completion_mark, :boolean
  end
end
