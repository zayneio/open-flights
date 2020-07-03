require 'rails_helper'

RSpec.describe Airline, type: :model do
  let(:user) { create(:user) }
  let(:airline) { create(:airline) }
  let!(:reviews) { create_list(:review, 2, user_id: user.id, airline_id: airline.id) }

  describe '#slugify' do
    it { expect(airline.slug).to eq('fake-airline') }
  end

  describe '#calculate_average' do
    it { expect(airline.reviews.size).to eq 2 }
    it { expect(airline.reviews.sum(:score)).to eq 6 }

    it 'sets the review avg on airline' do 
      expect(airline.calculate_average).to be true
      expect(airline.average_score).to eq 300
    end
  end
end
