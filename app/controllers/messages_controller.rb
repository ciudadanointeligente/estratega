class MessagesController < ApplicationController
  before_action :set_message, except: [:index, :create]
  before_action :set_ask
  respond_to :html, :json

  def index
    @messages = @ask.messages
    respond_with(@messages)
  end

  def show
    respond_with(@ask, @message)
  end

  def create
    @message = @ask.messages.create(message_params)
    if !params[:actors].blank?
      @message.actor_ids = params[:actors]
    end

    respond_with(@ask, @message)
  end

  def update
    @message.update(message_params)

    if !params[:actors].blank?
      @message.actor_ids = params[:actors]
    end

    respond_with(@ask, @message)
  end

  def destroy
    @message.destroy
    respond_with(@ask, @message)
  end

  private
    def set_ask
      @ask = Ask.find(params[:ask_id])
    end

    def set_message
      @message = Message.find(params[:id])
    end

    def message_params
      params.require(:message).permit(:description, :executed, :ask_id)
    end
end
