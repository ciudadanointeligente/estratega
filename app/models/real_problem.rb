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
          "team" => [
              {
                  "head" => {
                      "name" => policy_solution.title,
                      "styleprop" => {}
                  }
              }
          ]
        }
        policy_solution_list.append policy_solution_hash
      end
      policy_problem_hash =
        {
          "title" => {
            "name" => policy_problem.title,
            "styleprop" => {
              "activity_rounded" => true
            }
          },
          "subitems" => {
            "teams" => policy_solution_list
          }
        }
      policy_problem_list.append policy_problem_hash
    end
    
    
    json = { "company" => { "name" => self.title, "styleprop" => { "activity_rounded" => true } },
        "projects" => policy_problem_list
      }.to_json
    return json
  end
end
