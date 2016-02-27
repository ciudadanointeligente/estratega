class Activity < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :objective
  #belongs_to :message
  has_and_belongs_to_many :outcomes
  #has_and_belongs_to_many :asks
  has_one :indicator, dependent: :destroy
end
