# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :policy_problem do
    title "MyText"
    description "MyText"
    real_problem nil
  end
end
