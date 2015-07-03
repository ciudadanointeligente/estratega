class ActivitiesController < ApplicationController
  before_action :set_activity, only: [:show, :edit, :update, :destroy]
  before_action :set_project

  respond_to :html

  def index
    @activities = Activity.all
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
    @activity = @project.activities.create(activity_params)
    respond_with(@project, @activity)
  end

  def update
    @activity.update(activity_params)
    respond_with(@project, @activity)
  end

  def destroy
    @activity.destroy
    respond_with(@project, @activity)
  end

  def stage6
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_activity
      @activity = Activity.find(params[:id])
    end

    def activity_params
      params.require(:activity).permit(:title, :description, :project_id, outcome_ids: [])
    end
end
