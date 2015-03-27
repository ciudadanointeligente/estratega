class PolicySolutionsController < ApplicationController
  before_action :set_policy_solution, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @policy_solutions = PolicySolution.all
    respond_with(@policy_solutions)
  end

  def show
    respond_with(@policy_solution)
  end

  def new
    @policy_solution = PolicySolution.new
    respond_with(@policy_solution)
  end

  def edit
  end

  def create
    @policy_solution = PolicySolution.new(policy_solution_params)
    @policy_solution.save
    respond_with(@policy_solution)
  end

  def update
    @policy_solution.update(policy_solution_params)
    respond_with(@policy_solution)
  end

  def destroy
    @policy_solution.destroy
    respond_with(@policy_solution)
  end

  private
    def set_policy_solution
      @policy_solution = PolicySolution.find(params[:id])
    end

    def policy_solution_params
      params.require(:policy_solution).permit(:title, :description, :policy_problem_id)
    end
end
