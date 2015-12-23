class AsksController < ApplicationController
  before_action :set_ask, only: [:show, :edit, :update, :destroy]
  before_action :set_project
  before_action :set_objective

  respond_to :html, :json

  def index
    @asks = @objective.asks
    respond_with(@asks)
  end

  def show
    respond_with(@ask)
  end

  def new
    @ask = Ask.new
    respond_with(@ask)
  end

  def edit
  end

  def create
    @ask = @objective.asks.create(ask_params)
    respond_with(@project, @objective, @ask)
  end

  def update
    @ask.update(ask_params)
    @ask.actor_ids = params[:actor_ids]
    respond_with(@project, @objective, @ask)
  end

  def destroy
    @ask.destroy
    respond_with(@project, @objective)
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_objective
      @objective = Objective.find(params[:objective_id])
    end

    def set_ask
      @ask = Ask.find(params[:id])
    end

    def ask_params
      params.require(:ask).permit(:description, :execution, :objective_id, actor_ids: [])
    end
end
