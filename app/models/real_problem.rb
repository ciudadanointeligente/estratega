class RealProblem < ActiveRecord::Base
  validates :title, presence: true
  belongs_to :project
  has_many :policy_problems, dependent: :destroy

  def to_graph_json
    policy_problem_list = []
    policy_problems.each do |policy_problem|
      solution_list = []
      policy_problem.solutions.each do |solution|
        solution_hash =
        {
          "title" => solution.title
        }
        solution_list.append solution_hash
      end
      policy_problem_hash =
        {
          "title" => policy_problem.title,
          "solutions" => solution_list
        }
      policy_problem_list.append policy_problem_hash
    end

    json = { "real_problem" => { "title" => self.title },
        "policy_problems" => policy_problem_list
      }.to_json

    return json
  end

  def get_solutions
    policy_problem_list = []

    policy_problems.each do |pp|
      pp.solutions.each do |s|
        policy_problem_list << s
      end
    end

    return policy_problem_list
  end

  def get_solution
    pp = policy_problems.first.solutions.first

    return pp
  end

  def focus_area_list
    focus_area = ['Eradicate extreme poverty and hunger', 'Achieve universal primary education', 'Promote gender equality and empower women', 'Reduce child mortality', 'Improve maternal health', 'Combat HIV/AIDS, malaria and other diseases', 'Ensure environmental sustainability', 'Develop a global partnership for development']
    return focus_area
  end

	def solutions_associated
		solutions = []

		policy_problems.each do |pp|
			solutions << pp.id
		end
		puts solutions.inspect
		return solutions
	end
end
