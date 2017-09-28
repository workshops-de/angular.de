Jekyll::Hooks.register :site, :pre_render do |p|
  require 'fastimage'
  puts "Checking header images"
  Dir["artikel/header_images/*"].each do |file|
    img = FastImage.new(file)

    if img.type != :jpeg
      puts "Header image '#{file}' is not of type JPG"
      exit 1
    end

    # puts file
    # puts img.type == :jpeg

  end
end
