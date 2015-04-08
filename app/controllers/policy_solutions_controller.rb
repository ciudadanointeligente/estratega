class PolicySolutionsController < ApplicationController
  before_action :set_policy_solution, only: [:show, :edit, :update, :destroy]
  before_action :set_policy_problem
  before_action :set_real_problem

  respond_to :html

  def index
    @policy_solutions = PolicySolution.where(policy_problem_id: @policy_problem)
    respond_with(@real_problem, @policy_problem, @policy_solution)
  end

  def show
    respond_with(@real_problem, @policy_problem, @policy_solution)
  end

  def new
    @policy_solution = PolicySolution.new
    respond_with(@real_problem, @policy_problem, @policy_solution)
  end

  def edit
  end

  def create
    @policy_solution = @policy_problem.policy_solutions.create(policy_solution_params)
    @policy_solution.save
    respond_with(@real_problem, @policy_problem, @policy_solution)
  end

  def update
    @policy_solution.update(policy_solution_params)
    respond_with(@real_problem, @policy_problem, @policy_solution)
  end

  def destroy
    @policy_solution.destroy
    respond_with(@real_problem, @policy_problem)
  end

  private
    def set_policy_solution
      @policy_solution = PolicySolution.find(params[:id])
    end

    def set_policy_problem
      @policy_problem = PolicyProblem.find(params[:policy_problem_id])
    end

    def set_real_problem
      @real_problem = RealProblem.find(params[:real_problem_id])
    end

    def policy_solution_params
      params.require(:policy_solution).permit(:title, :description, :policy_problem_id)
    end
end
