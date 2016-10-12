class UserMailer < Devise::Mailer
  helper :application # gives access to all helpers defined within `application_helper`.
  include Devise::Controllers::UrlHelpers # Optional. eg. `confirmation_url`
  default template_path: 'devise/mailer' # to make sure that your mailer uses the devise views

  default from: Devise.mailer_sender

  def new_user_share(data)
    @user = User.find_by_email(data[:email])

    @message = data[:message]
    @token = data[:token]
    @project = data[:project]
    @subdomain = data[:subdomain]

    mail(to: @user.email, subject: I18n.t('devise.mailer.new_user_share.added'))
  end

  def exist_user_share(data)
    @user = User.find_by_email(data[:email])

    @message = data[:message]
    @project = data[:project]
    @subdomain = data[:subdomain]

    mail(to: @user.email, subject: I18n.t('devise.mailer.exist_user_share.shared'))
  end

end
