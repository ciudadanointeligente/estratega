class DemoController < ApplicationController
  before_action :set_project, only: [:show, :stage1]

  respond_to :html

  def index
    @project = Project.find(1)
    respond_with(@project)
  end

  def show
    respond_with(@project)
  end

  def stage1
    @real_problem = @project.real_problem

    respond_with(@project)
  end

  private
    def set_project
      @project = Project.find(params[:id])
    end
end
