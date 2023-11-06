FROM ruby:2.7
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev npm
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN bundle install
ADD . /app
RUN npm i
RUN npm i -g yarn
EXPOSE 3000
CMD ["rails", "s", "-b", "0.0.0.0"]