require 'rails_helper'

RSpec.describe Message, :type => :model do

  
  it "has a valid factory" do
    FactoryGirl.create(:message).should be_valid
  end
  
  it "is not valid without a description" do
    build(:message, description: nil).should_not be_valid
  end
 
  it "can have activity" do
     message = create(:message)
     activity = create(:activity)
     message.activity = activity
     
     expect(message.activity).to eq(activity)
     
  end
  
  it "can have actor" do
     message = create(:message)
     actor = create(:actor)
     message.actor = actor
     
     expect(message.actor).to eq(actor)
     
  end
  
  it "can have activity" do
     message = create(:message)
     activity = create(:activity)
     message.activity = activity
     
     expect(message.activity).to eq(activity)
     
  end  
end

