class AirlineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :image_url
  has_many :reviews
end
