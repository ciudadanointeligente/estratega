class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
  #include HttpAcceptLanguage::AutoLocale
  include Pundit
  protect_from_forgery with: :exception

  before_filter :set_language

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to main_app.root_url, :alert => exception.message
  end

  private

  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(request.referrer || root_path)
  end

	def after_sign_in_path_for(resource)
		projects_path
	end

  def after_sign_in_path_for(resource)
    projects_path
  end

  def set_language
    p :set_language
    if session[:locale].nil?
      if params[:locale].nil?
        session[:locale] = I18n.default_locale
      else
        session[:locale] = params[:locale]
      end
    else
      if params[:locale].nil?
        #session[:locale] = session[:locale]
      else
        session[:locale] = params[:locale]
      end
    end
    I18n.locale = session[:locale]
  end
end
