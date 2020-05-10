module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # Airlines#index description
    field :airlines, [AirlineType], null: true do
      description "Find all airlines"
    end

    # Airlines#index method
    def airlines
      Airline
        .includes(:reviews)
        .all
    end

    # Airlines#show description
    field :airline, AirlineType, null: true do
      description "Find a airline by Slug"
      argument :slug, String, required: true
    end

    # Airlines#show method
    def airline(slug:)
      Airline
        .includes(:reviews)
        .find_by(slug: slug)
    end
  end
end
