# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :resource do
    title "Title"
    description "Desc"
    public true

    factory :edit_resource do
      title "New Title"
    end
    factory :invalid_resource do
      title ""
    end
  end
end
