class RealProblem < ActiveRecord::Base
  validates :title, presence: true
  has_many :policy_problems, dependent: :destroy

  def to_graph_json 
    json = { "company" => { "name" => self.title, "styleprop" => { "activity_rounded" => true } } }.to_json
    return json
  end
end
