Jekyll::Hooks.register :site, :after_init do |p|
  require 'fastimage'
  puts "Checking header images"
  Dir["assets/**/*.jpeg"].each do |file|
    puts "Image: #{file}"
    puts "Don't use extension .jpeg, rename it to .jpg"
    exit 1
  end
  puts "Checking header images...done"
end
