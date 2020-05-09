module ReviewService
  class Create
    class << self
      def call(title:, description:, score:, airline_id:)
        airline = Airline.find(airline_id)
        review = airline.reviews.new(
          title: title, 
          description: description, 
          score: score,
          airline_id: airline_id
        )
  
        if review.save
          review
            .slice(*%i[id title description score airline_id])
            .merge(message: 'success', error: nil)
        else
          { message: 'failure', errors: review.errors.messages }
        end
      end
    end
  end
end
