class Activity < ActiveRecord::Base
  validates :description, presence: true
  belongs_to :objective, dependent: :destroy
  belongs_to :project, required: true
  has_many :messages
  #has_and_belongs_to_many :outcomes
  #has_and_belongs_to_many :asks
  has_one :indicator, dependent: :destroy
  has_and_belongs_to_many :actors
end
