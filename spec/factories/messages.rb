FactoryGirl.define do
  factory :message do
    description "My Message"

    factory :edit_message do
      description "New Message"
      executed true
    end
  end
end