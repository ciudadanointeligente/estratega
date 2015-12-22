class Message < ActiveRecord::Base
  validates :message, presence: true
  has_one :ask
  has_and_belongs_to_many :actors
end