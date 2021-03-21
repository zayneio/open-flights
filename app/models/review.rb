class Review < ApplicationRecord
  belongs_to :airline
  belongs_to :user

  # Recalculate the average score for a parent airline
  # whenever a review is created/updated/destroyed
  after_commit -> (review) { review.airline.calculate_average }

  def graphql_json_response
    as_json.merge(message: 'success', error: nil, code: 200)
  end
end
