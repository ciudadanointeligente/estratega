require 'rails_helper'

RSpec.describe Solution, :type => :model do
  #pending "add some examples to (or delete) #{__FILE__}"
	it "return an array of obj solutions related to an objective" do
		solution = Solution.new
		expect(solution.related_objectives).to be_an Array
	end
end
