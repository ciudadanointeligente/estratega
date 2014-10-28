# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :other_name do
    name "MyString"
    start_date "2014-10-21 17:37:10"
    end_date "2014-10-21 17:37:10"
    note "MyString"

    factory :invalid_other_name do
      name ""
      start_date "2014-10-21 17:37:10"
      end_date "2014-10-21 17:37:10"
      note "MyString"
    end
  end
end
