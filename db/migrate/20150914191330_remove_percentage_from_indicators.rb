class RemovePercentageFromIndicators < ActiveRecord::Migration
  def change
    remove_column :indicators, :percentage, :text
  end
end
