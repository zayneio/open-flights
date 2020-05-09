module Mutations
  class DestroyReview < GraphQL::Schema::Mutation
    null false

    argument :id, Integer, required: true
  
    field :review, Types::ReviewType, null: false
    field :errors, [String], null: true
    field :message, String, null: true

    type Types::ReviewType

    def resolve(id:)
      ReviewService::Destroy.call(id: id)
    end
  end
end
