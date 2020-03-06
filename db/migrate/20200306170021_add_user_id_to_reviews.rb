class AddUserIdToReviews < ActiveRecord::Migration[6.0]
  def change
    add_reference :reviews, :user, foreign_key: true
  end
end
