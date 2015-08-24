class Project < ActiveRecord::Base
  has_many :resources, dependent: :destroy
  has_many :objectives, dependent: :destroy
  has_one :real_problem, dependent: :destroy

  validates :title, presence: true

  def activities
    @activities = []
    self.objectives.each do |objective|
      objective.activities.each do |activity|
        @activities << activity
      end
    end
    return @activities
  end
end
