require 'rails_helper'

RSpec.describe MessagesController, :type => :controller do

  before(:each) do
    @project = create(:project)
    @objective = create(:objective)
    @ask = create(:ask)

    @project.objectives << @objective
    @objective.asks << @ask
  end

  let(:valid_session) { {} }

  describe "GET index" do
    it "return a json response" do
      actor_one = create(:actor)
      actor_two = create(:actor)
      message = create(:message)
      message.actors << actor_one
      @ask.messages << message

      get :index, {ask_id: @ask}, valid_session, format: 'json'
      expect(assigns(:messages).length).to eq(1)
    end
  end

  describe "GET show" do
    it "return a json response" do
      message = create(:message)

      get :show, {ask_id: @ask, id: message.to_param, format: 'json'}
      expect(assigns(:message)).to eq(message)
    end
  end

  describe "POST create" do
    describe "with valid params" do
      it "create a message" do
        expect {
          post :create, {ask_id: @ask, message: attributes_for(:message)}, valid_session
        }.to change(Message, :count).by(1)
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "update a message" do
        @message = create(:message)
        put :update, {ask_id: @ask, id: @message.to_param, message: attributes_for(:edit_message)}
        expect(assigns(:message)).to eq(@message)
      end
    end
  end

end
