require 'rails_helper'

RSpec.describe DemoController, :type => :controller do

  before(:each) {
    @project = Project.create( title: "A demo Project" )
    @real_problem = RealProblem.create( title: "A real world problem" )
    @project.real_problem = @real_problem
    @policy_problem = PolicyProblem.create( title: "A policy problem" )
    @real_problem.policy_problems << @policy_problem
    @solution = Solution.create( title: "A solution" )
    @policy_problem.solutions << @solution
  }

  let(:valid_session) {
    {"warden.user.user.key" => session["warden.user.user.key"]}
  }

  describe "GET index" do
    it "retrieve the demo project" do
      get :index, {}, valid_session
      expect(assigns(:project).title).to eq(@project.title)
    end
  end

  describe "GET show" do
    it "display the demo project" do
      get :show, {id: @project.to_param}, valid_session
      expect(assigns(:project)).to eq(@project)
    end
  end

  describe "GET stage1" do
    it "display the stage1 for the demo" do
      get :stage1, {id: @project.to_param }, valid_session
      expect([assigns(:real_problem)]).to include(@real_problem)
      # expect(assigns(:policy_problems)).to include(@policy_problem)
      # expect(assigns(:solutions)).to include(@solution)
    end
  end

end
