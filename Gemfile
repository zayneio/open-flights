source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 6.0', '>= 6.0.3.4'
gem 'pg', '>= 0.18', '< 2.0'
gem 'puma', '~> 4.3'
gem 'webpacker'

gem 'brakeman'
gem 'bcrypt'
gem 'bundler-audit'
gem 'coffee-rails', '~> 4.2'
gem 'fast_jsonapi'
gem 'figaro'
gem 'turbolinks', '~> 5'
gem 'sass-rails', '~> 5.0'
gem 'sendgrid-ruby'
gem 'sidekiq'
gem 'uglifier', '>= 1.3.0'
gem 'graphql'
gem 'graphql-batch'
gem 'graphiql-rails', group: :development
gem 'pry'

group :development, :test do
  gem 'factory_bot_rails'
  gem 'rspec-rails'
  gem 'rspec_junit_formatter'
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do

  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'

  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]