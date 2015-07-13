class Ask < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :activity
  belongs_to :actor
end
