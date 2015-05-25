# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :solution do
    title "MyText"
    description "MyText"
  
    factory :invalid_solution do
      title ""
    end

    factory :edit_solution do
      title "Policy Solution Title"
    end

    factory :solution2 do
      title "Policy Solution Title 2"
    end

    factory :solution3 do
      title "Policy Solution Title 3"
    end

    factory :solution4 do
      title "Policy Solution Title 4"
    end
  end
end
