module Types
  class ReviewType < Types::BaseObject
    field :id, Integer, null: true
    field :title, String, null: true
    field :description, String, null: true
    field :score, Integer, null: true
    field :airline_id, Integer, null: true
    
    # Return a 'success' mesage for destroy mutations
    field :message, String, null: true

    # Return an error for create and destroy mutations when error occurs
    field :error, String, null: true
  end
end
