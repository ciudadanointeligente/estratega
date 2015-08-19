class Objective < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :project
  has_and_belongs_to_many :solutions
  has_and_belongs_to_many :actors
  has_many :outcomes
  has_many :activities, dependent: :destroy
  has_many :asks, dependent: :destroy

  def objective_type_list
    objective_type = ["Policy development","Placement on the policy agenda","Policy adoption","Policy blocking","Policy implementation","Policy maintenance", "Other"]
    return objective_type
  end
end