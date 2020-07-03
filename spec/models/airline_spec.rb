require 'rails_helper'

RSpec.describe Airline, type: :model do
  airline = Airline.create(name: 'Fake Airlines')

  describe '#slugify' do
    it { expect(airline.slug).to eq('fake-airlines')}
  end

  describe '#calculate_average' do
    reviews = Review.create([
      { title: 'asdf', description: 'jkl;', score: 1}
    ])
  end
end
