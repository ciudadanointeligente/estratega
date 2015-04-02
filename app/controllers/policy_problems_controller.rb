class PolicyProblemsController < ApplicationController
  before_action :set_policy_problem, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @policy_problems = PolicyProblem.all
    respond_with(@policy_problems)
  end

  def show
    respond_with(@policy_problem)
  end

  def new
    @policy_problem = PolicyProblem.new
    respond_with(@policy_problem)
  end

  def edit
  end

  def create
    @real_problem = RealProblem.find(policy_problem_params[:real_problem_id])
    @policy_problem = @real_problem.policy_problems.create(policy_problem_params)
    respond_with(@policy_problem)
  end

  def update
    @policy_problem.update(policy_problem_params)
    respond_with(@policy_problem)
  end

  def destroy
    @policy_problem.destroy
    respond_with(@policy_problem)
  end

  private
    def set_policy_problem
      @policy_problem = PolicyProblem.find(params[:id])
    end

    def policy_problem_params
      params.require(:policy_problem).permit(:title, :description, :real_problem_id)
    end
end
