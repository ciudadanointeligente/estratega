class MessagesController < ApplicationController
  before_action :set_message, except: [:index, :create]
  before_action :set_ask, except: [:update]
  respond_to :html, :json

  def index
    @messages = @ask.messages
    respond_with(@messages)
  end

  def show
    respond_with(@ask, @message)
  end

  def create
    @message = Message.create(message_params)
    @ask.message_ids << @message
    respond_with(@ask, @message)
  end

  def update
    @message.update(message_params)
    respond_with(@message)
  end

  private
    def set_ask
      @ask = Ask.find(params[:ask_id])
    end

    def set_message
      @message = Message.find(params[:id])
    end

    def message_params
      p params
      params.require(:message).permit(:message, actor_ids: [])
    end
end
