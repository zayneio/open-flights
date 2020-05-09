module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    # First describe the field signature:
    field :airline, AirlineType, null: true do
      description "Find a airline by Slug"
      argument :slug, String, required: true
    end

    # Then provide an implementation:
    def airline(slug:)
      Airline.find_by(slug: slug)
    end
  end
end
