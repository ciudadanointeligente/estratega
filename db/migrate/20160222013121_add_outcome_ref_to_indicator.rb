class AddOutcomeRefToIndicator < ActiveRecord::Migration
  def change
    add_reference :indicators, :outcome, index: true, foreign_key: true
  end
end