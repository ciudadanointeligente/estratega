Rails.application.routes.draw do
  devise_for :users
  resources :people
  resources :other_names
  resources :sandboxes

  root to: 'visitors#index'
end
