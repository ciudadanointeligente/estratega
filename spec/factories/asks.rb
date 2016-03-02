# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :ask do
    description "MyText"
    person_in_charge "person_in_charge"

    factory :invalid_ask do
      description ""
      person_in_charge ""
    end

    factory :edit_ask do
      description "Ask Title"
      person_in_charge "person_in_charge edited"
    end
  end
end
