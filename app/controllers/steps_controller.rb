class StepsController  < ApplicationController
	before_action :authenticate_user!
  # steps :step1_1, :step1_2, :step1_3
  respond_to :html

  def show
    @real_problem = RealProblem.find_or_initialize_by(id: params[:rp_id])
    case step
    when :step1_2
      @real_problem = RealProblem.find(params[:rp_id])
      #the list of PP
      @policy_problems = @real_problem.policy_problems
      @policy_problem = PolicyProblem.new
      if params[:pp_id]
        @policy_problem = PolicyProblem.find(params[:pp_id])
      end
    when :step1_3
      @real_problem = RealProblem.find(params[:rp_id])
      #the list of PP
      @policy_problems = @real_problem.policy_problems
      # @solutions = @real_problem.policy_problems.solutions
    end
    render_wizard
  end
  def step2
    @objective = Objective.find_or_initialize_by(id: params[:objective_id])
    @objectives = Objective.all
  end

  def step3
  end

  def step4
  end
end
