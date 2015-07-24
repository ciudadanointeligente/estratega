require 'rails_helper'

RSpec.describe Objective, :type => :model do
  it "return an array with valid values" do
  	objective = Objective.new
  	expect(objective.objective_type_list).to include "Policy blocking"
  end
end
