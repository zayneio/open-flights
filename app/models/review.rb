class Review < ApplicationRecord
  belongs_to :airline
  belongs_to :user

  after_save :update_airline_score

  def update_airline_score
    airline.calculate_average
  end
end
