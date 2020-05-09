module ReviewService
  class Create
    class << self
      def call(title: nil, description: nil, score:, airline_id:)
        airline = Airline.find(airline_id)
        review = airline.reviews.new(
          title: title, 
          description: description, 
          score: score,
          airline_id: airline_id
        )
  
        if review.save
          payload = review.to_json(:only => %i[title description score airline_id])
          JSON.parse(payload)
        else
          { review: nil, errors: review.errors.messages }
        end
      end
    end
  end
end
