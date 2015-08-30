Rails.application.routes.draw do
  root 'static_pages#index'
  namespace :api do
    resources :highscores, only: [:create, :index]
  end
end
