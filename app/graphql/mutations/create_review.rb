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

    def resolve(*attributes)
      ReviewService::Create.call(
        attributes: attributes,
        user: context[:current_user]
      )
    end
  end
end
