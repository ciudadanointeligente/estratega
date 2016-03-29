class ContactMailer < ApplicationMailer
  default from: "Estratega.io <no-reply@votainteligente.cl>"
  default to: "Estratega.io <"+Devise.mailer_sender+">"

  def new_message(message)
    @message = message
    
    mail subject: "Message from #{message.name}"
  end

end
