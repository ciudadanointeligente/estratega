class RealProblem < ActiveRecord::Base
  validates :title, presence: true
  has_many :policy_problems, dependent: :destroy

  def to_graph_json 
    policy_problem_list = []
    policy_problems.each do |policy_problem|
      policy_solution_list = []
      policy_problem.policy_solutions.each do |policy_solution|
        policy_solution_hash =
        {
          "title" => policy_solution.title
        }
        policy_solution_list.append policy_solution_hash
      end
      policy_problem_hash =
        {
          "title" => policy_problem.title,
          "policy_solutions" => policy_solution_list
        }
      policy_problem_list.append policy_problem_hash
    end
    
    json = { "real_problem" => { "title" => self.title },
        "policy_problems" => policy_problem_list
      }.to_json
    
    return json
  end
end
