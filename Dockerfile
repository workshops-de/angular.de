FROM ruby:2.4

ENV JEKYLL_ENV=production

ENV HOME=/opt/app
WORKDIR $HOME

RUN apt-get update && apt-get install -y rsync

ADD Gemfile Gemfile.lock $HOME/

RUN bundle install

ADD . .

RUN bundle exec jekyll build
RUN rsync -v -rz --checksum --delete -e "ssh -o StrictHostKeyChecking=no" _site/ web28@37.17.224.121:/home/www/angularjs.de/

