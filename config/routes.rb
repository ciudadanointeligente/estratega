Rails.application.routes.draw do
  get 'proyects/index'

  get 'proyect/index'

  devise_for :users, :controllers => {:registrations => "registrations"}
  resources :people
  resources :other_names
  resources :sandboxes do
  	member do
  		get 'clone'
  	end
  end
  resources :tests

  root to: 'visitors#index'
end
