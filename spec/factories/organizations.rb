# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :organization do
    mane "MyString"
    email "MyString"
    subdomain "MyString"
    max_projects "MyString"
  end
end
