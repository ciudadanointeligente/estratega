class RealProblem < ActiveRecord::Base
  validates :title, presence: true
  has_many :policy_problems, dependent: :destroy
end
