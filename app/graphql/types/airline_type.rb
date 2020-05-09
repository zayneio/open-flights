module Types
  class AirlineType < Types::BaseObject
    field :id, Integer, null: true
    field :name, String, null: true
    field :image_url, String, null: true
    field :slug, String, null: true
    field :average_score, Integer, null: true
    field :reviews, [Types::ReviewType], null: true
  end
end
