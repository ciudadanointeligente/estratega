# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :objective do
    title "MyString"
    description "MyText"

    factory :objective2 do
      title "Objective Title 2"
    end

    factory :objective3 do
      title "Objective Title 3"
    end
  end
end
