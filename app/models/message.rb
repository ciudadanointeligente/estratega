class Message < ActiveRecord::Base
  validates :description, presence: true
  has_one :ask
  belongs_to :actor
  has_one :activity, dependent: :destroy
end