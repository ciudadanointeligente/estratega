require 'rails_helper'

RSpec.describe Objective, :type => :model do
  it "return an array with valid values" do
    objective = Objective.new
    expect(objective.objective_type_list).to include "Bloqueo de políticas públicas"
  end

  it "count of events is consistent" do
    require 'icalendar'
    objective = create(:objective)
    activity_one = create(:activity_one)
    activity_two = create(:activity_two)
    activity_three = create :activity
    objective.activities << activity_one
    objective.activities << activity_two

    expect(Icalendar.parse(objective.as_ical).first.events.size).to eq(2)
    expect(Icalendar.parse(objective.as_ical).first.events.first.dtstart).to eq(activity_one.scheduling)
    expect(Icalendar.parse(objective.as_ical).first.events.last.dtstart).to eq(activity_two.scheduling)
  end
  
  it "can have indicators" do
     objective = create(:objective)
     indicator = create(:indicator)
     objective.indicator = indicator
     
     expect(objective.indicator).to eq(indicator)
     
  end
end

