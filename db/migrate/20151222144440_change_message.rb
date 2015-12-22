class ChangeMessage < ActiveRecord::Migration
  def change
    rename_column :messages, :message, :description
  end
end
