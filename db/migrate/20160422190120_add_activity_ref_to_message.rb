class AddActivityRefToMessage < ActiveRecord::Migration
  def change
    add_reference :messages, :activity, index: true, foreign_key: true
  end
end
