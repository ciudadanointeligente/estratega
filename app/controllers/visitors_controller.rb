class VisitorsController < ApplicationController
	caches_page :index

  def index
    render :layout => "landing"
  end
end
