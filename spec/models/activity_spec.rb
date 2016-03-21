require 'rails_helper'

RSpec.describe Activity, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
  
  it "has a valid factory" do
    FactoryGirl.create(:activity).should be_valid
  end
  
  it "can have indicators" do
     activity = create(:activity)
     indicator = create(:indicator)
     activity.indicator = indicator
     
     expect(activity.indicator).to eq(indicator)
     
  end
  
  it "can have actors" do
     activity = create(:activity)
     actor1 = create(:actor)
     actor2 = create(:actor)
     activity.actors << actor1
     activity.actors << actor2
     
     expect(activity.actors).to include(actor1)
     expect(activity.actors).to include(actor2)
     
  end
  
  it "is not valid without a project" do
    invalid_activity = build(:invalid_activity)
    expect(invalid_activity).not_to be_valid
  end
  
  it "belongs to a project" do
     activity = create(:activity)
     project = create(:project)
     project.activities << activity
     expect(activity.project).to eq(project)
  end
  
end
