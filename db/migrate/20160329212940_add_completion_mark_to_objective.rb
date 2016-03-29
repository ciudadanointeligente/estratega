class AddCompletionMarkToObjective < ActiveRecord::Migration
  def change
    add_column :objectives, :completion_mark, :boolean
  end
end
