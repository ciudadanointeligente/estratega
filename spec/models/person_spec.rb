require 'rails_helper'

RSpec.describe Person, :type => :model do
  it "has a valid factory" do
    FactoryGirl.create(:person).should be_valid
  end
  it "is invalid without a name" do
    FactoryGirl.build(:person, name: nil).should_not be_valid
  end
end
