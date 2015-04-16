class StepsController < Wicked::WizardController
	before_action :authenticate_user!
  steps :step1_1, :step1_2, :step1_3

  def show
    @real_problem = RealProblem.find_or_initialize_by(id: params[:rp_id])
    case step
    when :step1_2
      @real_problem = RealProblem.find(params[:rp_id])
      #the list of PP
      @policy_problems = @real_problem.policy_problems.all
    end
    render_wizard
  end
end
