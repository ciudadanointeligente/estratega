class RealProblem < ActiveRecord::Base
  has_many :policy_problems, dependent: :destroy
end
