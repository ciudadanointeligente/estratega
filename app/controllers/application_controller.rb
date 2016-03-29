class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
  include Pundit
  protect_from_forgery with: :exception

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
  rescue_from ActiveRecord::RecordNotFound, with: :not_found 
  
  rescue_from ActionController::RoutingError , with: :not_found
  
  rescue_from Exception, with: :not_found
  
  

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to root_path
  end
  
  def not_found
    redirect_to(request.referrer || projects_path, :alert => 'Resource not found. An error ocurred.')
  end

	def after_sign_in_path_for(resource)
		projects_path
	end

  def after_sign_in_path_for(resource)
    projects_path
  end
end