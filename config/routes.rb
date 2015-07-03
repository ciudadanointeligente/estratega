Rails.application.routes.draw do
  root to: 'visitors#index'
  resources :actors

 
  get 'solutions/aside', to: 'solutions#aside'
  get 'solutions/aside_form', to: 'solutions#aside_form'
  get 'solutions/list', to: 'solutions#list'

  get 'real_problems/focus_area', to: 'real_problems#focus_area'
  resources :real_problems do
    resources :policy_problems do
      resources :solutions do
      end
    end
  end

  get 'outcomes/categories', to: 'outcomes#categories'
  
  resources :projects do
    get 'stage1', on: :member
    get 'stage2', on: :member
    resources :objectives do
      get 'stage3', on: :member
      get 'stage4', on: :member
      get 'actors', on: :member
      resources :outcomes do
        get 'stage5', on: :member
      end
    end
    resources :activities do
      get 'stage6', on: :member
      resources :asks
    end
    resources :resources do
      get 'aside', on: :collection
      get 'aside', on: :member
    end
  end

  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :people
  resources :other_names
  resources :sandboxes do
    get 'clone', on: :member
    get 'export', on: :member
  end
  get '/javascript_test/:script' => 'javascript_test#render_test', :as => 'javascript_test'

  get '/models', to: 'visitors#models'
end
