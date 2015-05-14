class ResourcesController < ApplicationController
  before_action :set_resource, only: [:show, :edit, :update, :destroy]
  before_action :set_project, except: [:aside_form, :list]

  respond_to :html, :json

  def index
    @resources = @project.resources
    respond_with(@resources)
  end

  def show
    respond_with(@resource)
  end

  def new
    @resource = Resource.new
    respond_with(@resource)
  end

  def edit
  end

  def aside
    @resource = params[:id] ? Resource.find(params[:id]) : Resource.new
    render :aside, layout: false
  end

  def aside_form
    render :aside_form, layout: false
  end

  def create
    @resource = @project.resources.create(resource_params)
    respond_with(@project, @resource)
  end

  def update
    @resource.update(resource_params)
    respond_with(@project, @resource)
  end

  def destroy
    @resource.destroy
    respond_with(@project, @resource)
  end

  private
    def set_project
      @project = Project.find(params[:project_id])
    end

    def set_resource
      @resource = Resource.find(params[:id])
    end

    def resource_params
       params.require(:resource).permit(:title, :description, :public, :tag_list, :project_id)
    end
end
