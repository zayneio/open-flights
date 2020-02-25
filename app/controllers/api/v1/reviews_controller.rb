module Api
  module V1
    class ReviewsController < ApplicationController
      protect_from_forgery with: :null_session

      # POST /api/v1/reviews
      def create
        review = Review.new(review_params)

        if review.save
          render json: ReviewSerializer.new(review).serialized_json
        else
          render json: { errors: review.errors.messages }, status: 422
        end
      end

      # DELETE /api/v1/reviews/:id
      def destroy
        review = Review.find(params[:id])

        if review.destroy
          head :no_content
        else
          render json: { errors: review.errors.messages }, status: 422
        end
      end

      private

      # Strong params
      def review_params
        params.require(:review).permit(:title, :description, :score, :airline_id)
      end
    end
  end
end