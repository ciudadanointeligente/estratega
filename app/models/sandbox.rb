class Sandbox < ActiveRecord::Base
  validates :name, presence: true
  belongs_to :users
end
