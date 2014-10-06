Rails.application.routes.draw do
  resources :sandboxes

  root to: 'visitors#index'
end
