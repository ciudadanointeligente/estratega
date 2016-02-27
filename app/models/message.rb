class Message < ActiveRecord::Base
  validates :description, presence: true
  belongs_to :ask
  belongs_to :actor
  #has_one :activity, dependent: :destroy
end