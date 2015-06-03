class AddEnvironmentFactorsToObjective < ActiveRecord::Migration
  def change
    add_column :objectives, :barriers, :string, array: true, default: []
    add_column :objectives, :enabling_factors, :string, array: true, default: []
  end
end
