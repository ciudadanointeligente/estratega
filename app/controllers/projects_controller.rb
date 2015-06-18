class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy, :solutions]

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

  def solutions
    @solutions = []
    @project.real_problem.policy_problems.each do |pp|
      pp.solutions.map {|s| @solutions << s}
    end
    respond_with(@project, @solutions)
  end

  def index
    @projects = Project.all
    respond_with(@projects)
  end

  def show
    @objectives = @project.objectives
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
