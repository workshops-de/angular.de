FROM ruby:2.4

ENV JEKYLL_ENV=production

ENV HOME=/opt/app
WORKDIR $HOME

ADD Gemfile Gemfile.lock $HOME/

RUN bundle install

ADD . .

RUN bundle exec jekyll build

