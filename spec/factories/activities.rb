# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :activity do
    title "MyText"
    description "MyText"

    factory :activity_one do
      scheduling DateTime.now + 1.day
    end
    factory :activity_two do
      scheduling DateTime.now + 2.day
    end
  end
end
