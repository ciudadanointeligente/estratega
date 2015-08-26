class UserMailerPreview < ActionMailer::Preview
  def new_user_share_preview
    UserMailer.new_user_share(User.first)
  end

  def exist_user_share_preview
    UserMailer.exist_user_share(User.first)
  end
end