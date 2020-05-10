module ReviewService
  class Base
    class << self
      def unauthorized
        { error: 'Unauthorized', code: 401 }
      end

      def not_found
        { error: 'Not Found', code: 404 }
      end

      def review_params(attributes)
        attributes
          .clone
          .pop
          .slice(:title, :description, :score, :airline_id)
      end
    end
  end
end
