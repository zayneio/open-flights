module ReviewService
  class Destroy
    class << self
      def call(id:)
        review = Review.find(id)
        review.destroy
        { success: true }
      end
    end
  end
end
