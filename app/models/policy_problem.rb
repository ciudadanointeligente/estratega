class PolicyProblem < ActiveRecord::Base
  belongs_to :real_problem
  has_many :policy_solutions, dependent: :destroy
end
