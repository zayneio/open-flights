module Api
  module V1
    class RegistrationsController < ApiController
      def create
        user = User.new(
          email: params[:user][:email],
          password: params[:user][:password],
          password_confirmation: params[:user][:password]
        )

        if user.save
          session[:user_id] = user.id
          render json: { status: :success, logged_in: true }, status: 204
        else
          render json: { status: :error, logged_in: false }, status: 422
        end
      end
    end
  end
end
