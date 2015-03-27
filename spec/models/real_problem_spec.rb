require 'rails_helper'

RSpec.describe RealProblem, :type => :model do
  it "returns a RealProblem in json format" do
    problem = RealProblem.new
    problem.title = "a real world problem" 
    json = { "company" => { "name" => "a real world problem", "styleprop" => { "activity_rounded" => true } } }.to_json

    expect(problem.to_graph_json).to eq(json)
  end
end
