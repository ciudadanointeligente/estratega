Rails.application.routes.draw do

  resources :real_problems do
    resources :policy_problems do
      resources :solutions
    end
  end

  # get 'steps/index'
  # get 'steps/step1'
  resources :steps
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

  get '/models', to: 'visitors#models'
  root to: 'visitors#index'
end
