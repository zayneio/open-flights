module Mutations
  class CreateReview < GraphQL::Schema::Mutation
    null false

    argument :title, String, required: true
    argument :description, String, required: true
    argument :score, Integer, required: true
    argument :airline_id, Integer, required: true
  
    field :review, Types::ReviewType, null: false
    field :errors, [String], null: true

    type Types::ReviewType

    def resolve(title:, description:, score:, airline_id:)
      ReviewService::Create.call(
        title: title, 
        description: description, 
        score: score,
        airline_id: airline_id
      )
    end
  end
end
