require 'rails_helper'

RSpec.describe Project, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"

  describe "activities" do
    it "return array of activities of one project" do
      @project = create(:project)
      @objective = create(:objective)
      @activity_1 = create(:activity)
      @activity_2 = create(:activity)

      @project.objectives << @objective
      @objective.activities << @activity_1 << @activity_2

      expect(@project.activities).kind_of?(Array)
      expect(@project.activities).to include(@activity_1)
      expect(@project.activities).to include(@activity_2)
    end
  end
end
