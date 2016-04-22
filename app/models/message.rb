class Message < ActiveRecord::Base
  validates :description, presence: true
  belongs_to :ask
  belongs_to :actor
  belongs_to :activity
end