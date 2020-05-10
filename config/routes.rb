Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "api/v2/graphql"
  end

  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug
      resources :reviews, only: %i[create destroy]
      resources :auth, only: %i[create] do
        collection do
          post 'password/forgot', to: 'auth#forgot_password'
          post 'password/reset', to: 'auth#reset_password'
          get 'me', to: 'auth#logged_in'
          delete 'logout', to: 'auth#logout'
        end
      end
 
      resources :registrations, only: %i[create]
    end

    namespace :v2 do
      match "graphql", to: "graphql#execute", via: %i[get post delete]
    end
  end

  get '*path', to: 'pages#index', via: :all
end
