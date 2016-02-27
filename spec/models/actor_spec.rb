require 'rails_helper'

RSpec.describe Actor, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
  
  it "has a valid factory" do
    FactoryGirl.create(:actor).should be_valid
  end

  it "return a non empty array" do
    myActorTypes = Actor.new
    expect(myActorTypes.actor_type_list).to be_an Array
    expect(myActorTypes.actor_type_list).not_to be_empty
  end

  it "return an array with valid values" do
    myActorTypes = Actor.new
    expect(myActorTypes.actor_type_list).to include 'Persona'
  end
  
  it "can have messages" do
     actor = create(:actor)
     message1 = create(:message)
     message2 = create(:message)
     actor.messages << message1
     actor.messages << message2
     
     expect(actor.messages).to include(message1)
     expect(actor.messages).to include(message2)
     
  end
  
    it "can have activities" do
     actor = create(:actor)
     activity1 = create(:activity)
     activity2 = create(:activity)
     actor.activities << activity1
     actor.activities << activity2
     
     expect(actor.activities).to include(activity1)
     expect(actor.activities).to include(activity2)
     
  end
end
