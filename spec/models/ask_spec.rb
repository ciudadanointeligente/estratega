require 'rails_helper'

RSpec.describe Ask, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
  
  it "has a valid factory" do
    FactoryGirl.create(:ask).should be_valid
  end
  
  it "is not valid without a description" do
    build(:ask, description: nil).should_not be_valid
  end
  
  it "can have indicators" do
     ask = create(:ask)
     indicator = create(:indicator)
     ask.indicator = indicator
     
     expect(ask.indicator).to eq(indicator)
     
  end
end
