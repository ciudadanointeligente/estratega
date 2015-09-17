# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :ask do
    description "MyText"

    factory :invalid_ask do
      description ""
    end

    factory :edit_ask do
      description "Ask Title"
    end
  end
end
