module Types
  class AirlineType < Types::BaseObject
    field :id, Integer, null: true
    field :name, String, null: true
    field :image_url, String, null: true
    field :slug, String, null: true
    field :avg_score, Integer, null: true
    field :reviews, [Types::ReviewType], 
          null: true,
          # And fields can have their own descriptions:
          description: "This post's comments, or null if this post has comments disabled."
  end
end
