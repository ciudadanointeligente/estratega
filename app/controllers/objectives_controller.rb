class ObjectivesController < ApplicationController
  before_action :set_objective, only: [:show, :edit, :update, :update_ww, :destroy, :destroy_ww]
  before_action :set_project

  respond_to :html, :json

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
    @objective = @project.objectives.create(objective_params)
    respond_with(@project, @objective)
  end

  def create_ww
    @objective = Objective.new(objective_params)
    @objective.save
    flash[:notice] = "Updated"
    redirect_to url_for("/steps/step2")
  end

  def update
    @objective.update(objective_params)
    respond_with(@project, @objective)
  end

  def update_ww
    @objective.update(objective_params)
    redirect_to url_for(controller: :steps, action: :step2)
  end

  def destroy
    @objective.destroy
    respond_with(@project, @objective)
  end

  def destroy_ww
    @objective.destroy
    redirect_to url_for(controller: :steps, action: :step2)
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_objective
      @objective = Objective.find(params[:id])
    end

    def objective_params
      params.require(:objective).permit(:title, :description, :prioritized, :project_id, solution_ids: [])
    end
end
