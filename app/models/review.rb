class Review < ApplicationRecord
  belongs_to :airline
  belongs_to :user

  def graphql_json_response
    as_json.merge(message: 'success', error: nil, code: 200)
  end
end
