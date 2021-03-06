require 'rails_helper'

RSpec.describe IndicatorsController, :type => :controller do
  let(:valid_attributes) {
    {
      owner_name: "owner name",
      owner_role: "owner role",
      expected_results: "expected results",
      obtained_results: "obtained results",
      settings: "settings",
      percentage: "99"
    }
  }

  let(:updated_attributes) {
    {
      owner_name: "updated owner name",
      owner_role: "updated owner role",
      expected_results: "updated expected results",
      obtained_results: "updated obtained results",
      settings: "updated settings",
      percentage: "99"
    }
  }

  before(:each) do
    @activity = create(:activity)
    @objective = create(:objective)
    @outcome = create(:outcome)
    @ask = create(:ask)
    
  end

  describe "GET show" do
    it "return a json response" do
      indicator = Indicator.create! valid_attributes
      get :show, {activity_id: @activity, id: indicator.to_param, :format => 'json'}
      expect(assigns(:indicator)).to eq(indicator)
      
      get :show, {objective_id: @objective, id: indicator.to_param, :format => 'json'}
      expect(assigns(:indicator)).to eq(indicator)
      
      get :show, {outcome_id: @outcome, id: indicator.to_param, :format => 'json'}
      expect(assigns(:indicator)).to eq(indicator)
      
      get :show, {ask_id: @ask, id: indicator.to_param, :format => 'json'}
      expect(assigns(:indicator)).to eq(indicator)
    end
  end

  describe "POST create" do
    it "create an indicator" do
      expect {
        post :create, {activity_id: @activity, indicator: valid_attributes}
      }.to change(Indicator, :count).by(1)
      
      expect {
        post :create, {objective_id: @objective, indicator: valid_attributes}
      }.to change(Indicator, :count).by(1)
      
      expect {
        post :create, {outcome_id: @outcome, indicator: valid_attributes}
      }.to change(Indicator, :count).by(1)
      
      expect {
        post :create, {ask_id: @ask, indicator: valid_attributes}
      }.to change(Indicator, :count).by(1)
    end
  end

  describe "PUT update" do
    it "update an indicator" do
      indicator = Indicator.create! valid_attributes
      put :update, {activity_id: @activity, :id => indicator.to_param, indicator: updated_attributes}
      expect(assigns(:indicator)).to eq(indicator)
      
      put :update, {objective_id: @objective, :id => indicator.to_param, indicator: updated_attributes}
      expect(assigns(:indicator)).to eq(indicator)
      
      put :update, {outcome_id: @outcome, :id => indicator.to_param, indicator: updated_attributes}
      expect(assigns(:indicator)).to eq(indicator)
      
      put :update, {ask_id: @ask, :id => indicator.to_param, indicator: updated_attributes}
      expect(assigns(:indicator)).to eq(indicator)
    end
  end

end
