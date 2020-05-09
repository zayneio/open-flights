module ReviewService
  class Destroy < ReviewService::Base
    class << self
      def call(id:, user:)
        return unauthorized unless user

        review = user.reviews.find_by(id: id)   
        return not_found unless review

        if review.destroy
          { error: nil, message: 'success' }
        else
          { error: review.errors.messages, message: 'failure' }
        end
      end
    end
  end
end
