# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :sandbox do
    name "MyString"
    description "MyString"
    graph_data "MyString"
    
    factory :invalid_sandbox do 
      name ""
      description "MyString"
      graph_data "MyString"
    end
  end
end
