#!/usr/bin/env ruby

require "yaml"
require 'net/http'

puts "Downloading gravatars"

def save_gravatar_image(gravatar_uid, size)
  puts "Writing UID #{gravatar_uid} in size #{size}"
  image = Net::HTTP.get(URI.parse("http://www.gravatar.com/avatar/#{gravatar_uid}?s=#{size}"))
  File.write("assets/img/gravatars/#{gravatar_uid}-#{size}x#{size}.jpg", image)
end

Dir["_data/users/*.yaml"].each do |file|
  user = YAML.load_file(file)
  gravatar_uid = user["gravatar_uid"]

  if gravatar_uid then
    save_gravatar_image(gravatar_uid, 64)
    save_gravatar_image(gravatar_uid, 160)
    if user["team"] || user["trainer"] then
      save_gravatar_image(gravatar_uid, 300)
    end
  end
end
