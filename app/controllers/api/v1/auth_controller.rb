module Api
  module V1
    class AuthController < ApiController
      before_action :authenticate, except: %i[create logged_in]

      def create
        user = User.find_by(email: params[:user][:email]).try(:authenticate, params[:user][:password])

        if user
          session[:user_id] = user.id
          render json: { status: :success, logged_in: true }, status: 204
        else
          render json: { status: :error, logged_in: false }, status: 400
        end
      end

      def logout
        reset_session

        render json: { logged_in: false }, status: 200
      end

      def logged_in
        if current_user
          render json: { email: current_user&.email, logged_in: true }, status: 200
        else
          render json: { logged_in: false }, status: 200
        end
      end
    end
  end
end

