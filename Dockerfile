FROM ruby:2.4

ENV JEKYLL_ENV=production

ENV HOME=/opt/app
ENV LC_CTYPE="de_DE.UTF-8"
ENV LANG="de_DE.UTF-8"
WORKDIR $HOME

ADD Gemfile Gemfile.lock $HOME/

RUN bundle install

ADD . .

RUN bundle exec jekyll build

