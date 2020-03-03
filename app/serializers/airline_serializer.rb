class AirlineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :image_url, :avg_score
  has_many :reviews
end
