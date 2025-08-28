FROM ruby:latest

WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && npm -g install yarn && yarn -v

COPY Gemfile* .
RUN bundle install
COPY  package.json .
RUN yarn install
EXPOSE 3000
COPY . .
# ENTRYPOINT [ "bash" ]
CMD ["rails", "server", "-b", "0.0.0.0"]