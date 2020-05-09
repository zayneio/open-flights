module ReviewService
  class Destroy
    class << self
      def call(id:)
        review = Review.find(id)

        if review.destroy
          { error: nil, message: 'success' }
        else
          { error: review.errors.messages, message: 'failure' }
        end
      end
    end
  end
end
