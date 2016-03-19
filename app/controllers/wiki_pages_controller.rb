class WikiPagesController < ApplicationController
  acts_as_wiki_pages_controller

  def show_allowed?
    user_signed_in?
  end

  def edit_allowed?
    current_user.admin?
  end
end
