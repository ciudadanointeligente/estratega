# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :policy_solution do
    title "MyText"
    description "MyText"

    factory :invalid_policy_solution do
        title ""
      end

    factory :edit_policy_solution do
      title "Policy Solution Title"
    end
  end
end
