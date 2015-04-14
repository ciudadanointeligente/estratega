class StepsController < ApplicationController
	before_action :authenticate_user!

  def index
  end
  def step1
  	@real_problems = RealProblem.new
  	# after process
  	if !params[:id].blank?
  		@real_problems = RealProblem.find(params[:id])
  	end
  end
  def step1_1
  end
  def step1_2
  end
  def step1_3
  end
end
