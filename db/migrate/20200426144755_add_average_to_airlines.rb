class AddAverageToAirlines < ActiveRecord::Migration[6.0]
  def change
    add_column :airlines, :average_score, :integer, default: 0 
  end
end
