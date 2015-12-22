FactoryGirl.define do
  factory :message do
    message "My Message"

    factory :edit_message do
      message "New Message"
    end
  end
end