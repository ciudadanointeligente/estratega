class AddPeopleToOtherName < ActiveRecord::Migration
  def change
    add_reference :other_names, :people, index: true
  end
end
