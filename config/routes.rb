Rails.application.routes.draw do
  resources :people
  resources :other_names
  resources :sandboxes

  root to: 'visitors#index'
end
