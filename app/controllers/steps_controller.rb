class StepsController < ApplicationController
  def index
  end
  def step1
  	@real_problems = RealProblem.new
  end
end
