class IndicatorsController < ApplicationController
  before_action :set_parent
  before_action :set_indicator, except: [:create]
  respond_to :html, :json

  def show
    respond_with_parent
  end

  def create
    @indicator = Indicator.create(indicator_params)
    @parent.indicator = @indicator
    respond_with_parent
  end

  def update
    @indicator.update(indicator_params)
    respond_with_parent
  end

  private
    def set_indicator
      @indicator = Indicator.find(params[:id])
    end

    def set_parent
      if params[:activity_id]
        @parent = Activity.find(params[:activity_id])
      elsif params[:objective_id]
        @parent = Objective.find(params[:objective_id])
      elsif params[:outcome_id]
        @parent = Outcome.find(params[:outcome_id])
      end
    end

    def indicator_params
      params.require(:indicator).permit(:owner_name, :owner_role, :expected_results, :obtained_results, :settings, :percentage)
    end
    
    def respond_with_parent
      if @parent.class == Activity
        @activity = @parent
        respond_with(@activity,@indicator)
      elsif @parent.class == Objective
        @objective = @parent
        respond_with(@objective,@indicator)
      elsif @parent.class == Outcome
        @outcome = @parent
        respond_with(@outcome,@indicator)
      end
    end
end
