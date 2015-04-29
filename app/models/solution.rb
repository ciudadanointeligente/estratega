class Solution < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :policy_problem
  has_and_belongs_to_many :objectives
end
