Rails.application.routes.draw do
  resources :policy_solutions
  resources :policy_problems
  resources :real_problems
  
  get 'steps/index'
  get 'steps/step1'
  resources :projects
  resources :resources

  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :people
  resources :other_names
  resources :sandboxes do
  	member do
      get 'clone'
    end
    member do
  		get 'export'
    end
  end
  get '/javascript_test/:script' => 'javascript_test#render_test', :as => 'javascript_test'

  root to: 'visitors#index'
end
