class ActivitiesController < ApplicationController
  before_action :set_activity, only: [:show, :edit, :update, :destroy]
  before_action :set_project
  before_action :set_objective

  respond_to :html, :json

  def index
    if params[:outcome_id]
      @activities = Outcome.find(params[:outcome_id]).activities
    else
      @activities = Activity.all
    end
    respond_with(@activities)
  end

  def show
    respond_with(@activity)
  end

  def new
    @activity = Activity.new
    respond_with(@activity)
  end

  def edit
  end

  def create
    @activity = @objective.activities.create(activity_params)
    respond_with(@project, @objective, @activity)
  end

  def update
    @activity.update(activity_params)
    respond_with(@project, @objective, @activity)
  end

  def destroy
    @activity.destroy
    respond_with(@project, @objective, @activity)
  end

  def stage6
  end

  private
    def set_objective
      @objective = Objective.find(params[:objective_id])
    end

    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_activity
      @activity = Activity.find(params[:id])
    end

    def activity_params
      params.require(:activity).permit(:title, :description, :completion, :scheduling, :objective_id, outcome_ids: [])
    end
end
