class Review < ApplicationRecord
  belongs_to :airline
  belongs_to :user, optional: true
  
  # Update the average score for airline.
  after_save -> (review) do 
    review.airline.calculate_average
  end
end
