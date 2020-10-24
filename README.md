## OpenFlights 
### A flight reviews app built with Ruby on Rails and React.js

This app is intended to be a simple example of a CRUD app built with **Ruby on Rails** and **React.js** using **Webpacker**.

---
![OpenFlights Home](https://github.com/zayneio/open-flights/blob/master/app/assets/images/index-demo.png?raw=true)
---
![OpenFlights Show](https://github.com/zayneio/open-flights/blob/master/app/assets/images/show-demo.png?raw=true)


---

This app uses:

* Ruby version: `2.7`
* Rails version: `6.0.3.4`
* Database: `postgresql`
* React version: `16.12.0`
* React Hooks API
* React Context API

## Running it locally
- run `bundle exec rails db:prepare`
- run `npm install` or `yarn install`
- run `bundle exec rails s`
- in another tab run `./bin/webpack-dev-server` (optional) 
- in another tab run `sidekiq` (optional, but necessary for things like password reset emails)
- navigate to `http://localhost:3000`

## Environment Variables
If you want functionality like password reset emails to work locally, you'll need to set the following environment variables in `config/application.yml` with your own unique values:
```
ROOT_URL: http://localhost:3000
SENDGRID_API_KEY: xxxxxxxxxxxxxx
SENDGRID_USERNAME: xxxxxxxxxxxxxx
SENDGRID_PASSWORD: xxxxxxxxxxxxxx
DEFAULT_FROM_EMAIL: you@example.com
```

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

## Api V2 (Graphql)

**Get Airlines#index**
```
query Airlines {
  airlines {
    id
    name
    imageUrl
    slug
    averageScore
    reviews {
      id
      title
      description
      score
    }
  }
}
```

**Get Airlines#show**
```
query Airline {
  airline(slug:) {
    id
    name
    imageUrl
    slug
    averageScore
    reviews {
      id
      title
      description
      score
    }
  }
}
```

**Create Review**
```
mutation {
  createReview(
    title: "test",
    description: "test",
    score: 1,
    airlineId: 1
  ) {
    id
    title
    description
    score
    airlineId
    error
    message
  }
}
```

**Destroy Review**
```
mutation {
  destroyReview(id:) {
    message
    error
  }
}
```

---

## How to rebuild this app from scratch (*WORK IN PROGRESS)

For an up to date, full step-by-step guide on how to rebuild this app from scratch, check out [this article I've put together.](https://zayne.io/articles/how-to-build-a-crud-app-with-ruby-on-rails-and-react)

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

For our airlines, we want to have a `name` for each airline, a unique url-safe `slug`, and an `image_url` for airline logos (Note: I'm not going to handle file uploading in this article, instead we will just link to an image hosted on s3).

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
    reviews.average(:score).to_f.round(2)
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
    reviews.average(:score).to_f.round(2)
  end
end
```


## Seeding Our Database
Now that we have got our models created, let's go ahead and seed our database with some data! We can add this to the `seeds.rb` file located inside of our `db` folder:

```ruby
Airline.create([
  { 
    name: "United Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/United-Airlines.png"
  }, 
  { 
    name: "Southwest",
    image_url: "https://open-flights.s3.amazonaws.com/Southwest-Airlines.png"
  },
  { 
    name: "Delta",
    image_url: "https://open-flights.s3.amazonaws.com/Delta.png" 
  }, 
  { 
    name: "Alaska Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/Alaska-Airlines.png" 
  }, 
  { 
    name: "JetBlue",
    image_url: "https://open-flights.s3.amazonaws.com/JetBlue.png" 
  }, 
  { 
    name: "American Airlines",
    image_url: "https://open-flights.s3.amazonaws.com/American-Airlines.png" 
  }
])
```

And then we can seed our database by running the following command in our terminal:

```shell
rails db:seed
```

Now if we jump into our rails console with `rails c` we should be able to see our new data in the database:

```ruby
Airline.first
# => #<Airline id: 1, name: "United Airlines", slug: "united-airlines", image_url: "https://open-flights.s3.amazonaws.com/United-Airlines.png", created_at: "2019-12-26 23:02:58", updated_at: "2019-12-26 23:02:58">
```

Notice that even though we only included the name and image_url in our seed data, we additionally have a slug value (in this case "united-airlines") because we added that slugify method to our airline model. We will use this slug shortly as the paramater to find records by in our controllers, instead of using the id param.


## Serializers: Building Our JSON API

For this app we are going to use [fast_jsonapi](https://github.com/Netflix/fast_jsonapi), a gem created by the Netflix engineering team. If you have ever used Active Model Serializer (AMS), you will likely notice some similarities.

with fast_jsonapi, we can create the exact structure for the data we want to expose in our api, and then use that when we render json from within our controllers.

Let's install the fast_jsonapi gem, by adding it to our Gemfile:

```ruby
gem 'fast_jsonapi'
```

Then we can install it with bundle install from our terminal:

```shell
bundle install
```

Now we can use a generator to create a new airline serializer and review serializer, passing along the specific attributes we want to expose in our api:

```shell
rails g serializer Airline name slug image_url
```

```shell
rails g serializer Review title description score airline_id
```

This will create a new serializer folder in our app and create a new airline serializer that should so far look like this:

```ruby
class AirlineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :image_url
end
```   

And a reviews serializer that should look like this:

```ruby
class ReviewSerializer
  include FastJsonapi::ObjectSerializer
  attributes :title, :description, :score, :airline_id
end  
```

For our airlines serializer, we want to include the relationship with reviews in our serialized json. We can add this simply by adding `has_many :reviews` into our serializer. So then our serializer should look like this:

```ruby
class AirlineSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :slug, :image_url
  has_many :reviews
end
```

Let's take a quick look at how we can use our serializers now to structure our api. If we jump into a rails console (`rails c`) in our terminal, let's get the first airline from our database. Then we can initialize a new instance of our airline serializer with that record and return the result as serialized json:

```ruby
# Get the first airline record from our database
airline = Airline.first
=> #<Airline id: 1, name: "United Airlines", slug: "united-airlines", image_url: "https://open-flights.s3.amazonaws.com/United-Airlines.png", created_at: "2019-12-26 23:02:58", updated_at: "2019-12-26 23:02:58">

# Serialized JSON
AirlineSerializer.new(airline).serialized_json
=> "{\"data\":{\"id\":\"1\",\"type\":\"airline\",\"attributes\":{\"name\":\"United Airlines\",\"slug\":\"united-airlines\",\"image_url\":\"https://open-flights.s3.amazonaws.com/United-Airlines.png\"},\"relationships\":{\"reviews\":{\"data\":[]}}}}"

# Formatted JSON
AirlineSerializer.new(airline).as_json
=> {
  "data" => {
    "id" => "1", 
    "type" => "airline", 
    "attributes" =>  {
      "name" => "United Airlines", 
      "slug" => "united-airlines", 
      "image_url" => "https://open-flights.s3.amazonaws.com/United-Airlines.png"
    }, 
    "relationships" => {
      "reviews" => {
        "data" => []
      }
    }
  }
}
```

In the above examples, you can see that the only attributes shared within the attributes section are those that we have explicitly declared in our airline seriaizer.

## Controllers
Our app is going to have three controllers: an airlines controller, a reviews controller and a pages controller. Our pages controller will have a single index action that I'm going to use as the root path of our app. I'm also going to use Pages#index as a sort of catch-all for any requests outside of our api. This will come in handy once we start using react-router in a little, as we will need to be able to match routes to different components.

For our airlines and reviews controllers, we are going to namespace everything under api/v1. Again, this will give us an easy way to manage routing from both the react side of our app and the rails side once we additionally start using react-router in a moment.

For example, if a user navigates to /airlines in our app, on the react side we can load the necessary components to show a list of all airlines, and on the back end we can make the request to our Airline#index action in our controller as /api/v1/airlines to get a list of all of the airlines from our api.

### Routes
Let's actually go ahead and set up our routes, adding our root path and our namespaced api resources:

```ruby
Rails.application.routes.draw do

  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :airlines, param: :slug
      resources :reviews, only: [:create, :destroy]
    end
  end

  get '*path', to: 'pages#index', via: :all
end   
```

Notice that I added `param: :slug` to our airlines resources so that we can use our slugs as the primary param for airlines instead of using id.

### Airlines Controller
Inside of `app/controllers`, let's create a new `api` folder, and inside of that, a new `v1` folder, and then inside of that let's create a new airlines controller, namespaced under`Api::V1`:

```ruby
module Api
  module V1
    class AirlinesController < ApplicationController
    end
  end
end
```

### Airlines#index
Now let's add an index method to our new controller. All we need to do for this method is get all of the airlines from our database, then render the data as JSON using our AirlineSerializer.

To get all of our airlines, we can simply call all on our Airline model like so:
```ruby
airlines = Airline.all
```

Then we can pass our airlines variable as an argument into a new instance of our AirlineSerializer and return our data as serialized JSON like so:

```ruby
AirlineSerializer.new(airlines).serialized_json
```

So putting these two steps together, and then rendering the result as JSON from our controller, our index method should look like this:

```ruby
module Api
  module V1
    class AirlinesController < ApplicationController
      def index
        airlines = Airline.all

        render json: AirlineSerializer.new(airlines).serialized_json
      end
    end
  end
end
```

### Airlines#show
Our show method will also be pretty simple. For this we just need to find a specific airline, not by its id, but using it's slug as the param. We can do this by calling find_by on our Airline model and searching for a record that has a matching slug, like so:

```ruby
airline = Airline.find_by(slug: params[:slug])
```

Then, we will again render the resulting JSON using our AirlineSerializer. So our show method should look like this:

```ruby
module Api
  module V1
    class AirlinesController < ApplicationController
      ...
      
      def show
        airline = Airline.find_by(slug: params[:slug])

        render json: AirlineSerializer.new(airlines).serialized_json
      end
    end
  end
end
```

### Airlines#create
Before we add our create method, let's use strong paramaters to create a whitelist of allowed parameters when creating a new airline in our app. For now we will allow only `name` and `image_url`:

```ruby
module Api
  module V1
    class AirlinesController < ApplicationController
      
      ... 

      private

      def airline_params
        params.require(:airline).permit(:name, :image_url)
      end
    end
  end
end
```

Then we can go ahead and add our create method. For this, we will simply initialize a new instance of Airline, passing in our airline_params. If everything is valid and saves, we will render data for our new airline again using our airline serializer, otherwise we will return an error:

```ruby

module Api
  module V1
    class AirlinesController < ApplicationController

      ...

      def create
        airline = Airline.new(airline_params)

        if airline.save
          render json: AirlineSerializer.new(airline).serialized_json
        else
          render json: { error: airline.errors.messages }, status: 422
        end
      end

      private

      def airline_params
        params.require(:airline).permit(:name, :image_url)
      end
    end
  end
end
```

---

This README is still being written - check back soon!

---

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
