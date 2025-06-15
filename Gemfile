# frozen_string_literal: true

source "https://rubygems.org"

git_source(:github) do |repo_name|
  "https://github.com/#{repo_name}.git"
end

ruby "3.2.2"

# Core framework
gem "rails", "~> 7.1.0"

# Database
gem "pg", ">= 0.18", "< 2.0"

# Web server
gem "puma", "~> 6.4"

# Security tools
gem "brakeman"
gem "bundler-audit"
gem "bcrypt"

# Frontend build (we'll set this up next)
gem "jsbundling-rails"
gem "sassc-rails"

# Development tools
group :development, :test do
  gem "byebug"
end

group :development do
  gem "web-console"
  gem "listen"
end

group :test do
  gem "rspec-rails"
end

group :development do
  gem 'graphiql-rails', '~> 1.8'
end
