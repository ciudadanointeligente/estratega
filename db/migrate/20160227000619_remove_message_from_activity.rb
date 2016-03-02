class RemoveMessageFromActivity < ActiveRecord::Migration
  def change
    remove_column :activities, :message_id
  end
end
