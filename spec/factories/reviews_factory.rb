FactoryBot.define do
  factory :review do
    title { "This is the title" }
    description  { "This is the description" }
    score { 3 }

    user
    airline
  end
end
