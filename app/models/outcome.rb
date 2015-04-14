class Outcome < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :objective
end
