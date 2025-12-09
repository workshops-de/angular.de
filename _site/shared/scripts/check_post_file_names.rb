#!/usr/bin/env ruby

Dir["_posts/**/*"].each do |file|
  file_name = File.basename(file)

  if file_name =~ /[A-Z_]/
    puts "Wrong filename #{file} - No capital letters or underscores allowed"
    # exit 1
  end
end
