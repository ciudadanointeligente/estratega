require 'spec_helper'

RSpec.describe TestsController, :type => :controller do
    describe "GET #index" do
        it "gets an html where I can run Qunit" do
            get :index
            response.should render_template :index
        end
    end
end