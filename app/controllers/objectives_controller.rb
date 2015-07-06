class ObjectivesController < ApplicationController
  before_action :set_objective, only: [:show, :edit, :update, :actors, :update_ww, :destroy, :destroy_ww]
  before_action :set_project

  respond_to :html, :json

  def index
    @objectives = Objective.where(project_id: params[:project_id])
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
    @objective = @project.objectives.create(objective_params)
    x = @objective.actor_ids
    @objective.actor_ids = x << params[:actor_id]
    # x = @objective.solution_ids
    # @objective.solution_ids = x << params[:solution_id]
    respond_with(@project, @objective)
  end

  def update
    puts "objective_params"
    puts objective_params
    puts "/objective_params"
    @objective.update(objective_params)
    respond_with(@project, @objective)
  end

  def destroy
    @objective.destroy
    respond_with(@project, @objective)
  end

  def actors
    respond_with(@objective.actors)
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_objective
      @objective = Objective.find(params[:id])
    end

    def objective_params
      params.require(:objective).permit(:title, :description, :prioritized, :project_id, solution_ids: [], actor_ids: [], barriers: [], enabling_factors: [])
    end
end
