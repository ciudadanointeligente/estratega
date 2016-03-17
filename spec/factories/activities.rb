# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :activity do
    title "MyText"
    description "MyText"
    association :project, factory: :project

    factory :activity_one do
      start_date DateTime.now + 1.day
    end
    
    factory :activity_two do
      start_date DateTime.now + 2.day
    end
    
    factory :invalid_activity do
      project nil
    end
  end
end
