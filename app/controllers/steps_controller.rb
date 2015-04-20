class StepsController < ApplicationController
  def index
  end
  def step1
  end
  def step2
    @objective = Objective.find_or_initialize_by(id: params[:objective_id])
    @objectives = Objective.all
  end
end
