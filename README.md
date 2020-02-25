# OpenFlights 
## A flight reviews app built with Ruby on Rails and React.js

This app is meant to be a simple example of a CRUD app built with Ruby on Rails and React.js using Webpacker.

![OpenFlights](https://zayne.io/assets/open-flights-836f680c85e73360f0dd2eb27057a132b5ca36f84a2babe72730e40cce6b70a3.png)

![OpenFlights Preview](https://zayne.io/assets/open-flights-show-1986b48fc8c72d4b62fbf8ac2ee800b1227aaa649bfe90874d17ead73dd493a5.png)
Some of the features of this app include:

* Ruby version: `2.6.0`
* Rails version: `6.0.1`
* Database: `postgres`


## Running it locally
- run `bundle exec rails db:prepare`
- run `bundle exec rails s`
- run `./bin/webpack-dev-server` (optional)
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

## How to build it

For an up to date, full step-by-step guide on how to rebuild this app from scratch, check out [this article](https://zayne.io/articles/how-to-build-a-crud-app-with-ruby-on-rails-and-react)


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