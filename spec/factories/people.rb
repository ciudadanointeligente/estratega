# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :person do
    name "MyString"
    email "MyString"
    gender "MyString"
    birth_date "2014-10-21 18:02:24"
    death_date "2014-10-21 18:02:24"
    image "MyString"
    summary "MyString"
    biography "MyText"

    factory :invalid_person do
      name ""
      email "MyString"
      gender "MyString"
      birth_date "2014-10-21 18:02:24"
      death_date "2014-10-21 18:02:24"
      image "MyString"
      summary "MyString"
      biography "MyText"
    end
  end
end
