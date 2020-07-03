require 'rails_helper'

RSpec.describe Airline, type: :model do
  describe '#slugify' do
    airline = Airline.create(name: 'Fake Airlines')

    it { expect(airline.slug).to eq('fake-airlines')}
  end
end
