class PolicyProblem < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :real_problem
  has_many :policy_solutions, dependent: :destroy
end
