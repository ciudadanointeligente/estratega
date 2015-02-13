require 'spec_helper'

RSpec.describe SandboxesController, :type => :controller do
  login_user
  describe "GET #index" do
    it "populates an array with my sandboxes" do
      my_sandbox = FactoryGirl.create(:sandbox)
      my_sandbox.user_id = @logged_in_user.id
      my_sandbox.save

      fierita = FactoryGirl.create(:user)
      other_sandbox = FactoryGirl.create(:sandbox)
      other_sandbox.user_id = fierita.id
      other_sandbox.save()

      get :index
      assigns(:sandboxes).should eq([my_sandbox])
    end
    it "displays all public sandboxes but not mine" do
      my_public_sandbox = FactoryGirl.create(:sandbox)
      my_public_sandbox.user_id = @logged_in_user.id
      my_public_sandbox.public = true
      my_public_sandbox.save

      fierita = FactoryGirl.create(:user)
      fieras_public_sandbox = FactoryGirl.create(:sandbox)
      fieras_public_sandbox.user_id = fierita.id
      fieras_public_sandbox.public = true
      fieras_public_sandbox.save()

      fieras_private_sandbox = FactoryGirl.create(:sandbox)
      fieras_private_sandbox.user_id = fierita.id
      fieras_private_sandbox.public = false
      fieras_private_sandbox.save()

      get :index
      # assigns(:sandboxes).should eq([my_sandbox])
      # Mis instancias publicas no deberían estar en @public_sandboxes
      assigns(:public_sandboxes).should_not include my_public_sandbox
      assigns(:public_sandboxes).should include fieras_public_sandbox
      assigns(:public_sandboxes).should_not include fieras_private_sandbox

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
    describe "with valid params and being the owner" do
      it "updates the requested sandbox" do
        sandbox = FactoryGirl.create(:sandbox)
        sandbox.user_id = @logged_in_user.id
        sandbox.save
        new_data = "NewData"
        put :update, {:id => sandbox.to_param, :sandbox => {"graph_data"=>new_data}}
        sandbox.reload
        expect(sandbox.graph_data).to eq(new_data)
        # It shouldn't modify other parameters
        expect(sandbox.name).to eq(FactoryGirl.attributes_for(:sandbox)[:name])
      end
      it "does not update the requested sandbox if not the owner" do
        fierita = FactoryGirl.create(:user)
        sandbox = FactoryGirl.create(:sandbox)
        sandbox.user_id = fierita.id
        sandbox.save

        new_data = "NewData"
        put :update, {:id => sandbox.to_param, :sandbox => {"graph_data"=>new_data}}
        sandbox.reload
        expect(sandbox.graph_data).to_not eq(new_data)
        # It shouldn't modify other parameters
        expect(sandbox.name).to eq(FactoryGirl.attributes_for(:sandbox)[:name])

      end

      it "assigns the requested sandbox as @sandbox" do
        sandbox = FactoryGirl.create(:sandbox)
        put :update, {:id => sandbox.to_param, :sandbox => FactoryGirl.attributes_for(:sandbox)}
        expect(assigns(:sandbox)).to eq(sandbox)
      end

      it "redirects to the sandbox if is the owner who does the change" do
        sandbox = FactoryGirl.create(:sandbox)
        sandbox.user_id = @logged_in_user.id
        sandbox.save
        put :update, {:id => sandbox.to_param, :sandbox => FactoryGirl.attributes_for(:sandbox)}
        expect(response).to redirect_to(sandbox)
      end
    end
  end
end