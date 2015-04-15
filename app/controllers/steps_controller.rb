class StepsController < Wicked::WizardController
	before_action :authenticate_user!
  steps :step1_1, :step1_2, :step1_3

  def show
    @real_problem = RealProblem.new
    render_wizard
  end
end
