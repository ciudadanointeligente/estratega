class AddObjectiveRefToIndicator < ActiveRecord::Migration
  def change
    add_reference :indicators, :objective, index: true, foreign_key: true
  end
end
