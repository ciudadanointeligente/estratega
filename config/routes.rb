Rails.application.routes.draw do
  root to: 'visitors#index'
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
  

  resources :real_problems do
    post 'create_ww', on: :collection
    patch 'update_ww',  on: :member
    resources :policy_problems do
      post 'create_ww', on: :collection
      patch 'update_ww', on: :member
      delete 'destroy_ww', on: :member
      resources :solutions do
        collection do
          post 'create_ww'
        end
      end
    end
  end

  resources :steps do
    get 'step2', on: :collection
  end

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
end
