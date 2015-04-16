class PolicyProblemsController < ApplicationController
  before_action :set_policy_problem, only: [:show, :edit, :update, :destroy]
  before_action :set_real_problem

  respond_to :html

  def index
    @policy_problems = PolicyProblem.where(real_problem_id: @real_problem.id)
    respond_with(@real_problem, @policy_problems)
  end

  def show
    respond_with(@real_problem, @policy_problem)
  end

  def new
    @policy_problem = PolicyProblem.new
    respond_with(@real_problem, @policy_problem)
  end

  def edit
    respond_with(@real_problem, @policy_problem)
  end

  def create
    @policy_problem = @real_problem.policy_problems.create(policy_problem_params)
    respond_with(@real_problem, @policy_problem)
  end

  def create_ww
    @policy_problem = @real_problem.policy_problems.create(policy_problem_params)
    redirect_to step_path(:step1_2, :rp_id => @real_problem.id)
  end

  def update
    @policy_problem.update(policy_problem_params)
    respond_with(@real_problem, @policy_problem)
  end

  def destroy
    @policy_problem.destroy
    respond_with(@real_problem)
  end

  private
    def set_policy_problem
      @policy_problem = PolicyProblem.find(params[:id])
    end

    def set_real_problem
      @real_problem = RealProblem.find(params[:real_problem_id])
    end

    def policy_problem_params
      params.require(:policy_problem).permit(:title, :description, :real_problem_id)
    end
end
