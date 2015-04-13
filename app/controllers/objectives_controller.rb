class ObjectivesController < ApplicationController
  before_action :set_objective, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @objectives = Objective.all
    respond_with(@objectives)
  end

  def show
    respond_with(@objective)
  end

  def new
    @objective = Objective.new
    respond_with(@objective)
  end

  def edit
  end

  def create
    @objective = Objective.new(objective_params)
    @objective.save
    respond_with(@objective)
  end

  def update
    @objective.update(objective_params)
    respond_with(@objective)
  end

  def destroy
    @objective.destroy
    respond_with(@objective)
  end

  private
    def set_objective
      @objective = Objective.find(params[:id])
    end

    def objective_params
      params.require(:objective).permit(:title, :description, solution_ids: [])
    end
end
