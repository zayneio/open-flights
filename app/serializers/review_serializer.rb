class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :airline_id

  attribute :email do |object|
    object&.user&.email
  end
end
