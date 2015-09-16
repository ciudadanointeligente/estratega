class AddPercentageFromIndicators < ActiveRecord::Migration
  def change
    add_column :indicators, :percentage, :integer
  end
end
