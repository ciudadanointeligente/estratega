class ActivitiesController < ApplicationController
  before_action :set_activity, only: [:show, :edit, :update, :destroy]

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
    @activity = Activity.new(activity_params)
    @activity.save
    respond_with(@activity)
  end

  def update
    @activity.update(activity_params)
    respond_with(@activity)
  end

  def destroy
    @activity.destroy
    respond_with(@activity)
  end

  private
    def set_activity
      @activity = Activity.find(params[:id])
    end

    def activity_params
      params.require(:activity).permit(:title, :description, outcome_ids: [])
    end
end
