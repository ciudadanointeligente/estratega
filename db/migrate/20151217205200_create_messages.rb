class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :message
      t.boolean :executed, default: false
      t.references :ask, index: true
      t.timestamps
    end
  end
end
