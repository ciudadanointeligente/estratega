class AddOutcomeRefToAsk < ActiveRecord::Migration
  def change
    add_reference :asks, :outcome, index: true, foreign_key: true
  end
end
