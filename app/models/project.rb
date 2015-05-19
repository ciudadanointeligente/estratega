class Project < ActiveRecord::Base
  has_many :resources, dependent: :destroy
  has_one :real_problem, dependent: :destroy
end
