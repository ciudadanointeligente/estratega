Rails.application.routes.draw do
  resources :actors

  resources :activities do
    resources :asks
  end

  resources :objectives do
    post :create_ww, on: :collection
    patch :update_ww, on: :member
    delete :destroy_ww, on: :member
    resources :outcomes
  end
  
  get 'steps/index'
  get 'steps/step1'
  get 'steps/step2'

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
