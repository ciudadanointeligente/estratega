class ContactMailer < ApplicationMailer
  default from: ENV['ADMIN_MAIL']
  default to: ENV['ADMIN_MAIL']

  def new_message(message)
    @message = message
    
    mail subject: "Message from #{message.name} at: " + Apartment::Tenant.current.to_s + " instance."
  end

end
