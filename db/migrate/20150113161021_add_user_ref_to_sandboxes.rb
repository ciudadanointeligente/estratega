class AddUserRefToSandboxes < ActiveRecord::Migration
  def change
    add_reference :sandboxes, :user, index: true
  end
end
