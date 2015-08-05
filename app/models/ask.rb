class Ask < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :objective
  belongs_to :actor
end
