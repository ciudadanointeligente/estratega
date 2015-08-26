class ObjectivesController < ApplicationController
  before_action :set_objective, only: [:show, :edit, :update, :actors, :update_ww, :destroy, :destroy_ww, :outcomes]
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
    @objective.solution_ids = params[:solution_ids]
    respond_with(@project, @objective)
  end

  def update
    @objective.update(objective_params)
    @objective.solution_ids = params[:solution_ids]
    respond_with(@project, @objective)
  end

  def destroy
    @objective.destroy
    respond_with(@project, @objective)
  end

  def actors
    respond_with(@objective.actors)
  end

  def objective_types
    objective = Objective.new
    respond_with objective.objective_type_list
  end

  def stage5
  end

  def outcomes
    respond_with(@objective.outcomes)
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_objective
      @objective = Objective.find(params[:id])
    end

    def objective_params
      params.require(:objective).permit(:title, :description, :prioritized, :project_id, :big_difference_score, :big_difference_arguments, :multiplying_effect_score, :multiplying_effect_arguments, :catalytic_score, :catalytic_arguments, :demand_score, :demand_arguments, :hooks_processes_score, :hooks_processes_arguments, :intuitive_score, :intuitive_arguments, :alignment_score, :alignment_arguments, :added_value_score, :added_value_arguments, :loss_gain_score, :loss_gain_arguments, :objective_type, actor_ids: [], barriers: [], enabling_factors: [])
    end
end
