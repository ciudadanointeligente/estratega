class Project < ActiveRecord::Base
  has_many :resources, dependent: :destroy
  has_many :objectives, dependent: :destroy
  has_one :real_problem, dependent: :destroy
  has_many :users, through: :permissions
  has_many :permissions

	validates :title, presence: true
end
