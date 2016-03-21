require 'rails_helper'

RSpec.describe Project, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"

  describe "activities" do
    it "return array of activities of one project" do
      @project = create(:project)
      # @objective = create(:objective)
      @activity_1 = create(:activity)
      @activity_2 = create(:activity)

      # @project.objectives << @objective
      @project.activities << @activity_1 << @activity_2

      expect(@project.activities).kind_of?(Array)
      expect(@project.activities).to include(@activity_1)
      expect(@project.activities).to include(@activity_2)
    end
    
    it "count of events is consistent" do
      require 'icalendar'
      #objective = create(:objective)
      @project = create(:project)
      activity_one = create(:activity_one)
      activity_two = create(:activity_two)
      activity_three = create :activity
      @project.activities << activity_one
      @project.activities << activity_two
  
      expect(Icalendar.parse(@project.as_ical).first.events.size).to eq(2)
      expect(Icalendar.parse(@project.as_ical).first.events.first.dtstart).to eq(activity_one.start_date)
      expect(Icalendar.parse(@project.as_ical).first.events.last.dtstart).to eq(activity_two.start_date)
    end
  end
  
end
