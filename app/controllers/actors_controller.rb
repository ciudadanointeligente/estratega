class ActorsController < ApplicationController
  before_action :set_actor, only: [:show, :edit, :update, :destroy]

  respond_to :html, :json

  def index
    @actors = Actor.all
    respond_with(@actors)
  end

  def show
    respond_with(@actor)
  end

  def new
    @actor = Actor.new
    respond_with(@actor)
  end

  def edit
  end

  def create
    @actor = Actor.create(actor_params)
    x = @actor.objective_ids
    @actor.objective_ids = x << params[:objective_id]
    respond_with(@actor)
  end

  def update
    @actor.update(actor_params)
    respond_with(@actor)
  end

  def destroy
    @actor.destroy
    respond_with(@actor)
  end

  def actor_type
    @actor = Actor.new
    respond_with(@actor.actor_type_list)
  end

  def actor_support
    @actor = Actor.new
    respond_with(@actor.actor_support_list)
  end

  def actor_influence_level
    @actor = Actor.new
    respond_with(@actor.actor_influence_level_list)
  end

  private
    def set_actor
      @actor = Actor.find(params[:id])
    end

    def actor_params
      params.require(:actor).permit(:name, :description, :important, :actor_type, :support, :influence, objective_ids: [])
    end
end
