# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :policy_solution do
    title "MyText"
    description "MyText"
    policy_problem nil
  end
end
