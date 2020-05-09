module Types
  class MutationType < Types::BaseObject
    field :create_review, mutation: Mutations::CreateReview
    field :destroy_review, mutation: Mutations::DestroyReview
  end
end
