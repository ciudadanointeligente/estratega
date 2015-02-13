require 'spec_helper'

RSpec.describe PeopleController, :type => :controller do
  login_user
  describe "GET #index" do
    it "populates an array of people" do
      person = FactoryGirl.create(:person)
      get :index
      assigns(:people).should eq([person])
    end
    it "renders the :index view" do
      get :index
      response.should render_template :index end
  end

  describe "GET #show" do
    it "assigns the requested person to @person" do
      person = FactoryGirl.create(:person)
      get :show, id: person
      assigns(:person).should eq(person)
    end
    it "renders the #show view" do
      get :show, id: FactoryGirl.create(:person)
      response.should render_template :show
    end
  end

  describe "GET new" do
    it "assigns a new person as @person" do
      get :new, {}
      expect(assigns(:person)).to be_a_new(Person)
    end
    it "renders the #new view" do
      get :new
      response.should render_template :new
    end
  end

  describe "GET edit" do
    it "assigns the requested person as @person" do
      person = FactoryGirl.create(:person)
      get :edit, {:id => person.to_param}
      expect(assigns(:person)).to eq(person)
    end
    it "renders the #edit view" do
      get :edit, id: FactoryGirl.create(:person)
      response.should render_template :edit
    end
  end

  describe "POST create" do
    context "with valid attributes" do
      it "creates a new person" do
        expect{
          post :create, person: FactoryGirl.attributes_for(:person)
        }.to change(Person,:count).by(1)
      end
      it "redirects to the new person" do
        post :create, person: FactoryGirl.attributes_for(:person)
        response.should redirect_to Person.last
      end
      it "assigns a newly created person as @person" do
        post :create, {:person => FactoryGirl.attributes_for(:person)}
        expect(assigns(:person)).to be_a(Person)
        expect(assigns(:person)).to be_persisted
      end
    end

    context "with invalid attributes" do
      it "assigns a newly created but unsaved person as @person" do
        post :create, {:person => FactoryGirl.attributes_for(:invalid_person)}
        expect(assigns(:person)).to be_a_new(Person)
      end
      it "does not save the new person" do
        expect{ post :create, person: FactoryGirl.attributes_for(:invalid_person) }.to_not change(Person,:count)
      end
      it "re-renders the 'new' template" do
        post :create, person: FactoryGirl.attributes_for(:invalid_person)
        response.should render_template :new
      end
    end
  end

  describe "PUT update" do
    describe "with valid params" do
      it "updates the requested person" do
        person = FactoryGirl.create(:person)
        new_name = "Cyndi Lauper"
        new_email = "clauper@example.com"
        new_summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam varius id dui non ultricies. Pellentesque tempus odio sem, sed consequat tellus bibendum dignissim. Sed sagittis mauris turpis, et tristique enim malesuada at."
        put :update, {:id => person.to_param, :person => {"name"=>new_name, "email"=>new_email, "summary"=>new_summary}}
        person.reload
        expect(person.name).to eq(new_name)
        expect(person.email).to eq(new_email)
        expect(person.summary).to eq(new_summary)
        # It shouldn't modify other parameters
        expect(person.biography).to eq(FactoryGirl.attributes_for(:person)[:biography])
      end

      it "assigns the requested person as @person" do
        person = FactoryGirl.create(:person)
        put :update, {:id => person.to_param, :person => FactoryGirl.attributes_for(:person)}
        expect(assigns(:person)).to eq(person)
      end

      it "redirects to the person" do
        person = FactoryGirl.create(:person)
        put :update, {:id => person.to_param, :person => FactoryGirl.attributes_for(:person)}
        expect(response).to redirect_to(person)
      end
    end
  end
end