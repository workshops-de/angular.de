Jekyll::Hooks.register :site, :after_init do |p|
  require 'fastimage'
  puts "Checking header images"
  Dir["artikel/header_images/*"].each do |file|
    img = FastImage.new(file)

    if img.type != :jpeg
      puts "Header image '#{file}' is not of type JPG"
      exit 1
    end

    if File.size(file) > 440000
      puts "Image '#{file}' is too big with #{File.size(file)}. Try to stay under 400kb!"
      exit 1
    end
  end
  puts "Checking header images...done"
end
