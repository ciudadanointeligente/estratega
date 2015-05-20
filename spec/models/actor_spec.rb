require 'rails_helper'

RSpec.describe Actor, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"

  it "return a non empty array" do
  	myActorTypes = Actor.new
  	expect(myActorTypes.type_list).to be_an Array
  	expect(myActorTypes.type_list).not_to be_empty
  end

  it "return an array with valid values" do
  	myActorTypes = Actor.new
  	expect(myActorTypes.type_list).to include 'Passive supporters with influence'
  end
end
