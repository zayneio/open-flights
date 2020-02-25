# OpenFlights 
## A flight reviews app built with Ruby on Rails and React.js

This app is meant to be a simple example of a CRUD app built with **Ruby on Rails** and **React.js** using **Webpacker**.

![OpenFlights](https://zayne.io/assets/open-flights-836f680c85e73360f0dd2eb27057a132b5ca36f84a2babe72730e40cce6b70a3.png)

![OpenFlights Preview](https://zayne.io/assets/open-flights-show-1986b48fc8c72d4b62fbf8ac2ee800b1227aaa649bfe90874d17ead73dd493a5.png)
Some of the features of this app include:

* Ruby version: `2.6.0`
* Rails version: `6.0.1`
* Database: `postgres`


## Running it locally
- run `bundle exec rails db:prepare`
- run `bundle exec rails s`
- (optional) in another tab run `./bin/webpack-dev-server`
- navigate to `http://localhost:3000`

## Routes
```shell
             Prefix Verb   URI Pattern                           Controller#Action
               root GET    /                                     pages#index
    api_v1_airlines GET    /api/v1/airlines(.:format)            api/v1/airlines#index
                    POST   /api/v1/airlines(.:format)            api/v1/airlines#create
 new_api_v1_airline GET    /api/v1/airlines/new(.:format)        api/v1/airlines#new
edit_api_v1_airline GET    /api/v1/airlines/:slug/edit(.:format) api/v1/airlines#edit
     api_v1_airline GET    /api/v1/airlines/:slug(.:format)      api/v1/airlines#show
                    PATCH  /api/v1/airlines/:slug(.:format)      api/v1/airlines#update
                    PUT    /api/v1/airlines/:slug(.:format)      api/v1/airlines#update
                    DELETE /api/v1/airlines/:slug(.:format)      api/v1/airlines#destroy
     api_v1_reviews POST   /api/v1/reviews(.:format)             api/v1/reviews#create
      api_v1_review DELETE /api/v1/reviews/:id(.:format)         api/v1/reviews#destroy
                    GET    /*path(.:format)                      pages#index
```

---

# How to rebuild this app from scratch

For an up to date, full step-by-step guide on how to rebuild this app from scratch, check out [this article](https://zayne.io/articles/how-to-build-a-crud-app-with-ruby-on-rails-and-react)

### Getting Started: Creating a New Rails App With React & Webpacker
First things first, let's create a brand new rails app. We can do this from the command line by doing `rails new app-name` where app-name is the name of our app, however we are going to add a few additional things. We need to add `--webpack=react` to configure our new app with webpacker to use react, and additionally I'm going to add `--database=postgresql` to configure my app to use postgres as the default database. so the final output to create our new app will look like this:

```shell
rails new open-flights --webpack=react --database=postgresql
```

Once this finishes running, make sure to cd into the directory of your new rails app (`cd open-flights`), then we can go ahead and create the database for our app by entering the following into our command line:

```
bundle exec rails db:create
```

## Models
Our data model for this app will be pretty simple. Our app will have `airlines`, and each airline in our app will have many `reviews`.

For our airlines, we want to have a `name` for each airline, a unique url-safe `slug`, and an `image_url` for airline logos (Note: I'm not going to handle file uploading in this post, instead we will just link to an image hosted on s3).

For our reviews, we want to have a `title`, `description`, `score`, and the `airline_id` for the airline the review will belong to. The scoring system I'm going to use for our reviews will be a star rating system that ranges from 1 to 5 stars; 1 being the worst score and 5 being the best score.


So from our command line we can enter the following generators to create our airline and review models in our app:

```shell
rails g model Airline name slug image_url
```

```shell
rails g model Review title description score:integer airline:belongs_to
```

This will create two new files in our `db/migrations` folder; one for airlines:

```ruby
class CreateAirlines < ActiveRecord::Migration[5.2]
  def change
    create_table :airlines do |t|
      t.string :name
      t.string :slug
      t.string :image_url

      t.timestamps
    end
  end
end
```

and one for reviews:

```ruby
class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title
      t.string :description
      t.integer :score
      t.belongs_to :airline, foreign_key: true

      t.timestamps
    end
  end
end
```

Additionally, we should now have airline and review model files created for us inside of our `app/models` directory. Because we used `airline:belongs_to` when we generated our review model, our `Review` model should already have the `belongs_to` relationship established, so our this model so far should look like this:

```ruby
class Review < ApplicationRecord
  belongs_to :airline
end
```

We need to additionally add `has_many :reviews` to our airline model. Once we do, our airline model should look like this:

```ruby
class Airline < ApplicationRecord
  has_many :reviews
end
```

At this point, we can go ahead and migrate our database:

```shell
rails db:migrate
```

Once you run that, you should see a new `schema.rb` file created within the `db` folder in our app. Your schema file should now look something like this:

```ruby
ActiveRecord::Schema.define(version: 2019_12_26_200455) do
  enable_extension "plpgsql"

  create_table "airlines", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.string "image_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title"
    t.string "description"
    t.integer "score"
    t.bigint "airline_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["airline_id"], name: "index_reviews_on_airline_id"
  end

  add_foreign_key "reviews", "airlines"
end
```

So now for our airline model, we need to do a couple things. First off, I want to add a `before_create` callback method that creates a unique slug based off of the airline's name when we create a new airline. To do this, we can add a new `slugify` method with a before create callback to our airline model like this:

```ruby
class Airline < ApplicationRecord
  has_many :reviews

  before_create :slugify

  def slugify
    self.slug = name.downcase.gsub(' ', '-')
  end
end
```

This slugify method will take the name of an airline, convert any uppercase characters to lowercase, replace any spaces with hyphens, and set this value as our slug before saving the record.

Actually, I think we can simplify this method further by just calling parameterize on our name attribute instead of using downcase and gsub:

```ruby
class Airline < ApplicationRecord
  has_many :reviews

  before_create :slugify

  def slugify
    self.slug = name.parameterize
  end
end
```

This parameterize method should handle both downcasing characters and replacing spaces with hyphens for us. Of course, we can quickly test this out from our rails console to confirm:

```ruby
'Fake AIRline Name     1'.parameterize
# => "fake-airline-name-1"
```

So now if/when we create a new airline, for example "United Airlines", this will convert the name to `united-airlines` and save it as the unique slug for that airline.

Additionally, we need to create a method that will take all of the reviews that belong to an airline and get the average overall rating. We can add an avg_score method to our model like this:

```ruby
class Airline < ApplicationRecord
  ...

  def avg_score
    return 0 unless reviews.size.positive?

    (reviews.sum(:score).to_f / reviews.count.to_f).to_f
  end
end  
```

This method will return 0 if an airline has no reviews yet. Otherwise it will get the sum of all the review scores for an airline divided by the total number of reviews for that airline to get the average rating.

So our full Airline model with our slugify method and avg_score method should now look like this:

```ruby

class Airline < ApplicationRecord
  has_many :reviews

  before_create :slugify

  def slugify
    self.slug = name.parameterize
  end

  def avg_score
    return 0 unless reviews.size.positive?

    (reviews.sum(:score).to_f / reviews.count.to_f).to_f
  end
end  
```

## License
```
Copyright (c) 2020 zayneio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```