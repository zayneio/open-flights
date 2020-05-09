module Types
  class ReviewType < Types::BaseObject
    field :id, Integer, null: true
    field :title, String, null: true
    field :description, String, null: true
    field :score, Integer, null: true
  end
end
