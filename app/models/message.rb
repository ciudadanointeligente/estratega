class Message < ActiveRecord::Base
  validates :description, presence: true
  has_one :ask
  has_and_belongs_to_many :actors
  has_one :activity
end