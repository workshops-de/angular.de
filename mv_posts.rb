#!/usr/bin/env ruby

# Moves all .md files in _post into its own folder
Dir["_posts/*.md"].each do |file|
  name = File.basename(file, ".md")
  new_dir = "_posts/#{name}"
  new_file = "#{new_dir}/#{name}.md"

  puts "Moving #{file} -> #{new_file}"
  Dir.mkdir(new_dir)
  File.rename file, new_file
end

Dir["_posts/**/*.md"].each do |file|
  name = File.basename(file, ".md")[11..-1]

  header_file = "artikel/header_images/#{name}.jpg"
  new_header_file = "#{File.dirname(file)}/header.jpg"

  if !File.exist?(new_header_file)
    puts "Moving header #{name}: #{File.exist?(header_file)}"
    if File.exist?(header_file)
      File.rename header_file, new_header_file
    end
  end
end
