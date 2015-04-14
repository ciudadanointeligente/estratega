class Solution < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :policy_problem
end
