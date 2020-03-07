Rails.application.routes.draw do
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug
      resources :reviews, only: %i[create destroy]
      resources :auth, only: %i[create] do
        collection do
          post 'password/forgot', to: 'auth#forgot_password'
          post 'password/reset', to: 'auth#reset_password'
          get 'logged_in', to: 'auth#logged_in'
          delete 'logout', to: 'auth#logout'
        end
      end
 
      resources :registrations, only: %i[create]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
