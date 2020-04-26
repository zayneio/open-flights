class Airline < ApplicationRecord
  has_many :reviews

  before_create :slugify

  # Slugify airline name into a url safe param before create
  # Ex: 'United Airlines'.parameterize => 'united-airlines'
  def slugify
    self.slug = name.parameterize
  end

  # Get the average score of all review for an airline
  def calculate_average
    return 0 unless reviews.size.positive?

    avg = reviews.average(:score).to_f.round(2) * 100

    update_attribute(:average_score, avg)
  end
end
