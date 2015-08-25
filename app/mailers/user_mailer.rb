class UserMailer < ActionMailer::Base
  default from: 'no-reply@advizard.com'

  def new_user_share(data)
    @user = User.find_by_email(data[:email])
    @message = data[:message]
    @token = data[:token]
    mail(to: @user.email, subject: 'Added to collaborate')
  end

  def exist_user_share(data)
    @user = User.find_by_email(data[:email])

    @message = data[:message]
    mail(to: @user.email, subject: 'Shared a project')
  end

end