class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :airline_id
end
