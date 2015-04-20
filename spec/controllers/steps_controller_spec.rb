require 'rails_helper'

RSpec.describe StepsController, :type => :controller do

  describe "GET index" do
    it "returns http success" do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET step2" do
    it "creates a new objetive as @objective" do
      get :step2, {}
      expect(assigns(:objective)).to be_a_new(Objective)
    end

    it "assigns an alrealdy created objective as @objective" do
      objective = create(:objective)
      get :step2, {objective_id: objective}
      expect(assigns(:objective)).to eq(objective)
    end

    it "lists all created objectives as @objectives" do
      objective = create(:objective)
      get :step2, {}
      expect(assigns(:objectives)).to include(objective)
    end
  end

end
