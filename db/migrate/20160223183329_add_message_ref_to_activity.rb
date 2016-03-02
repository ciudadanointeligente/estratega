class AddMessageRefToActivity < ActiveRecord::Migration
  def change
    add_reference :activities, :message, index: true, foreign_key: true
  end
end
