class Review < ApplicationRecord
  belongs_to :airline
  belongs_to :user
end
