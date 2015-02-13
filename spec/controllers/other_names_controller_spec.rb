require 'spec_helper'

RSpec.describe OtherNamesController, :type => :controller do
  describe "GET #index" do
    it "populates an array of other_names" do
      other_name = FactoryGirl.create(:other_name)
      get :index
      assigns(:other_names).should eq([other_name])
    end
    it "renders the :index view" do
      get :index
      response.should render_template :index end
  end

  describe "GET #show" do
    it "assigns the requested other_name to @other_name" do
      other_name = FactoryGirl.create(:other_name)
      get :show, id: other_name
      assigns(:other_name).should eq(other_name)
    end
    it "renders the #show view" do
      get :show, id: FactoryGirl.create(:other_name)
      response.should render_template :show
    end
  end

  describe "GET new" do
    it "assigns a new other_name as @other_name" do
      get :new, {}
      expect(assigns(:other_name)).to be_a_new(OtherName)
    end
    it "renders the #new view" do
      get :new
      response.should render_template :new
    end
  end

  describe "GET edit" do
    it "assigns the requested other_name as @other_name" do
      other_name = FactoryGirl.create(:other_name)
      get :edit, {:id => other_name.to_param}
      expect(assigns(:other_name)).to eq(other_name)
    end
    it "renders the #edit view" do
      get :edit, id: FactoryGirl.create(:other_name)
      response.should render_template :edit
    end
  end

  describe "POST create" do
    context "with valid attributes" do
      it "creates a new other_name" do
        expect{
          post :create, other_name: FactoryGirl.attributes_for(:other_name)
        }.to change(OtherName,:count).by(1)
      end
      it "redirects to the new other_name" do
        post :create, other_name: FactoryGirl.attributes_for(:other_name)
        response.should redirect_to OtherName.last
      end
      it "assigns a newly created other_name as @other_name" do
        post :create, {:other_name => FactoryGirl.attributes_for(:other_name)}
        expect(assigns(:other_name)).to be_a(OtherName)
        expect(assigns(:other_name)).to be_persisted
      end
    end

    context "with invalid attributes" do
      it "assigns a newly created but unsaved other_name as @other_name" do
        post :create, {:other_name => FactoryGirl.attributes_for(:invalid_other_name)}
        expect(assigns(:other_name)).to be_a_new(OtherName)
      end
      it "does not save the new other_name" do
        expect{ post :create, other_name: FactoryGirl.attributes_for(:invalid_other_name) }.to_not change(OtherName,:count)
      end
      it "re-renders the 'new' template" do
        post :create, other_name: FactoryGirl.attributes_for(:invalid_other_name)
        response.should render_template :new
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested other_name" do
        other_name = FactoryGirl.create(:other_name)
        new_name = "Cynthia Ann Stephanie Lauper"
        put :update, {:id => other_name.to_param, :other_name => {"name"=>new_name}}
        other_name.reload
        expect(other_name.name).to eq(new_name)
        # It shouldn't modify other parameters
        expect(other_name.note).to eq(FactoryGirl.attributes_for(:other_name)[:note])
      end

      it "assigns the requested other_name as @other_name" do
        other_name = FactoryGirl.create(:other_name)
        put :update, {:id => other_name.to_param, :other_name => FactoryGirl.attributes_for(:other_name)}
        expect(assigns(:other_name)).to eq(other_name)
      end

      it "redirects to the other_name" do
        other_name = FactoryGirl.create(:other_name)
        put :update, {:id => other_name.to_param, :other_name => FactoryGirl.attributes_for(:other_name)}
        expect(response).to redirect_to(other_name)
      end
    end
  end
end