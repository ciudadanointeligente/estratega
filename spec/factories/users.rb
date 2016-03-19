# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    email { Faker::Internet.email }
    password { Faker::Internet.password }

    factory :user2 do
      email { Faker::Internet.email }
      password { Faker::Internet.password }
    end

    factory :admin_user do
      email { Faker::Internet.email }
      password { Faker::Internet.password }
      admin true
    end
  end
end
