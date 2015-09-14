class DropTitleToAsk < ActiveRecord::Migration
  def change
  	remove_column :asks, :title, :text
  end
end
