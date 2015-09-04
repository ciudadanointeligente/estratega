class IndicatorsController < ApplicationController
  before_action :set_activity
  before_action :set_indicator, except: [:create]
  respond_to :html, :json

  def show
    respond_with(@activity, @indicator)
  end

  def create
    @indicator = Indicator.create(indicator_params)
    @activity.indicator = @indicator
    respond_with(@activity, @indicator)
  end

  def update
    @indicator.update(indicator_params)
    respond_with(@activity, @indicator)
  end

  private
    def set_indicator
      @indicator = Indicator.find(params[:id])
    end

    def set_activity
      @activity = Activity.find(params[:activity_id])
    end

    def indicator_params
      params.require(:indicator).permit(:owner_name, :owner_role, :expected_results, :obtained_results, :settings, :percentage)
    end
end
