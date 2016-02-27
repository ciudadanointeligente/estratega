class Ask < ActiveRecord::Base
  validates :description, presence: true
  belongs_to :objective
  belongs_to :outcome
  # belongs_to :actor
  #has_and_belongs_to_many :activities
  #has_and_belongs_to_many :actors
  has_many :messages, dependent: :destroy
  has_one :indicator, dependent: :destroy
end
