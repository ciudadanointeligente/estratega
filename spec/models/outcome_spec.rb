require 'rails_helper'

RSpec.describe Outcome, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"

  it "return a non empty array" do
  	myOutcome = Outcome.new
  	expect(myOutcome.type_list).to be_an Array
  	expect(myOutcome.type_list).not_to be_empty
  end

  it "return an array with valid values" do
  	myOutcome = Outcome.new
  	expect(myOutcome.type_list).to include 'Relevancia'
  end

  it "can have indicators" do
     outcome = create(:outcome)
     indicator = create(:indicator)
     outcome.indicator = indicator
     
     expect(outcome.indicator).to eq(indicator)

  end
  it "can have asks" do
     outcome = create(:outcome)
     ask = create(:ask)
     outcome.asks << ask
     
     expect(outcome.asks).to include(ask)

  end
  
  
end
