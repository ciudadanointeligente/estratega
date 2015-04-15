class StepsController < Wicked::WizardController
	before_action :authenticate_user!
  steps :step1_1, :step1_2, :step1_3

  def show
    @real_problem = RealProblem.new

    case step
    when :step1_2
      @real_problem = RealProblem.find(params[:rp_id])
      #creating a PP
      @policy_problem = @real_problem.policy_problems.create()
      #the list of PP
      @policy_problems = @real_problem.policy_problems.all
    end
    render_wizard
  end
end
