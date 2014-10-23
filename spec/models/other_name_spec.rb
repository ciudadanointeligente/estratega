require 'rails_helper'

RSpec.describe OtherName, :type => :model do
  it "has a valid factory" do
    FactoryGirl.create(:other_name).should be_valid
  end
  it "is invalid without a name" do
    FactoryGirl.build(:other_name, name: nil).should_not be_valid
  end
end
