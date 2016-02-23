class AddAskRefToIndicator < ActiveRecord::Migration
  def change
    add_reference :indicators, :ask, index: true, foreign_key: true
  end
end
