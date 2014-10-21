Rails.application.routes.draw do
  resources :other_names
  resources :sandboxes

  root to: 'visitors#index'
end
