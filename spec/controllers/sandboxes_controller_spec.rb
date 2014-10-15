require 'spec_helper'

RSpec.describe SandboxesController, :type => :controller do
  describe "GET #index" do
    it "populates an array of sandboxes" do
      sandbox = FactoryGirl.create(:sandbox)
      get :index
      assigns(:sandboxes).should eq([sandbox])
    end
    it "renders the :index view" do
      get :index
      response.should render_template :index end
  end

  describe "GET #show" do
    it "assigns the requested sandbox to @sandbox" do
      sandbox = FactoryGirl.create(:sandbox)
      get :show, id: sandbox
      assigns(:sandbox).should eq(sandbox)
    end
    it "renders the #show view" do
      get :show, id: FactoryGirl.create(:sandbox)
      response.should render_template :show
    end
  end

  describe "GET new" do
    it "assigns a new sandbox as @sandbox" do
      get :new, {}
      expect(assigns(:sandbox)).to be_a_new(Sandbox)
    end
    it "renders the #new view" do
      get :new
      response.should render_template :new
    end
  end

  describe "GET edit" do
    it "assigns the requested sandbox as @sandbox" do
      sandbox = FactoryGirl.create(:sandbox)
      get :edit, {:id => sandbox.to_param}
      expect(assigns(:sandbox)).to eq(sandbox)
    end
    it "renders the #edit view" do
      get :edit, id: FactoryGirl.create(:sandbox)
      response.should render_template :edit
    end
  end

  describe "POST create" do
    context "with valid attributes" do
      it "creates a new sandbox" do
        expect{
          post :create, sandbox: FactoryGirl.attributes_for(:sandbox)
        }.to change(Sandbox,:count).by(1)
      end
      it "redirects to the new sandbox" do
        post :create, sandbox: FactoryGirl.attributes_for(:sandbox)
        response.should redirect_to Sandbox.last
      end
      it "assigns a newly created sandbox as @sandbox" do
        post :create, {:sandbox => FactoryGirl.attributes_for(:sandbox)}
        expect(assigns(:sandbox)).to be_a(Sandbox)
        expect(assigns(:sandbox)).to be_persisted
      end
    end

    context "with invalid attributes" do
      it "assigns a newly created but unsaved sandbox as @sandbox" do
        post :create, {:sandbox => FactoryGirl.attributes_for(:invalid_sandbox)}
        expect(assigns(:sandbox)).to be_a_new(Sandbox)
      end
      it "does not save the new sandbox" do
        expect{ post :create, sandbox: FactoryGirl.attributes_for(:invalid_sandbox) }.to_not change(Sandbox,:count)
      end
      it "re-renders the 'new' template" do
        post :create, sandbox: FactoryGirl.attributes_for(:invalid_sandbox)
        response.should render_template :new
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested sandbox" do
        sandbox = FactoryGirl.create(:sandbox)
        new_data = "NewData"
        put :update, {:id => sandbox.to_param, :sandbox => {"graph_data"=>new_data}}
        sandbox.reload
        expect(sandbox.graph_data).to eq(new_data)
        # It shouldn't modify other parameters
        expect(sandbox.name).to eq(FactoryGirl.attributes_for(:sandbox)[:name])
      end

      it "assigns the requested sandbox as @sandbox" do
        sandbox = FactoryGirl.create(:sandbox)
        put :update, {:id => sandbox.to_param, :sandbox => FactoryGirl.attributes_for(:sandbox)}
        expect(assigns(:sandbox)).to eq(sandbox)
      end

      it "redirects to the sandbox" do
        sandbox = FactoryGirl.create(:sandbox)
        put :update, {:id => sandbox.to_param, :sandbox => FactoryGirl.attributes_for(:sandbox)}
        expect(response).to redirect_to(sandbox)
      end
    end

    describe "with invalid params" do
      xit "assigns the sandbox as @sandbox" do
        sandbox = Sandbox.create! valid_attributes
        put :update, {:id => sandbox.to_param, :sandbox => invalid_attributes}, valid_session
        expect(assigns(:sandbox)).to eq(sandbox)
      end

      xit "re-renders the 'edit' template" do
        sandbox = Sandbox.create! valid_attributes
        put :update, {:id => sandbox.to_param, :sandbox => invalid_attributes}, valid_session
        expect(response).to render_template("edit")
      end
    end
  end
end