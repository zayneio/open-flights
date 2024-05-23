# Use the official Ruby image as a base image
FROM ruby:3.1.1

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Set the working directory
WORKDIR /myapp

# Copy the Gemfile and Gemfile.lock into the working directory
COPY Gemfile /myapp/Gemfile
COPY Gemfile.lock /myapp/Gemfile.lock

# Install the Ruby dependencies
RUN bundle install

# Copy the entire Rails application to the working directory
COPY . /myapp

# Precompile assets for production
RUN bundle exec rake assets:precompile

# Expose port 3000 to the Docker host
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
