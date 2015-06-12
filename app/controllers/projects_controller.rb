class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]

  respond_to :html, :json

  def stage1
  end

  def stage2
  end

  def stage3
  end

  def stage4
  end

  def stage5
  end

  def stage6
  end

  def stage7
  end

  def index
    @public_projects = Project.where(public: true)
    @private_projects = Project.where(public: false)
    respond_with(@projects)
  end

  def show
    @objectives = @project.objectives
    @a_size = 0
    @barriers_size = 0
    @factors_size = 0
    @outcomes_size = 0
    @objectives.each do |o|
      @a_size = @a_size + o.actors.size
      @barriers_size = @barriers_size + o.barriers.size
      @factors_size = @factors_size + o.enabling_factors.size
      @outcomes_size = @outcomes_size + o.outcomes.size
    end
    respond_with(@project)
  end

  def new
    @project = Project.new
    respond_with(@project)
  end

  def edit
  end

  def create
    @project = Project.new(project_params)
    @project.public = false
    if project_params[:public]
      @project.public = true
    end
    @project.save
    respond_with(@project)
  end

  def update
    @project.update(project_params)
    respond_with(@project)
  end

  def destroy
    @project.destroy
    respond_with(@project)
  end

  private
    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params[:project].permit(:title, :description, :public)
    end
end
