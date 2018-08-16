Jekyll::Hooks.register :site, :after_init do |p|
  require 'fastimage'
  puts "Checking image filenames"
  Dir["assets/**/*.jpeg"].each do |file|
    puts "Image: #{file}"
    puts "Don't use extension .jpeg, rename it to .jpg"
    exit 1
  end

  Dir["{assets,_posts}/**/*.{jpg,gif,png,svg}"].each do |file|
    basename = File.basename(file, File.extname(file))
    if basename !~ /^[a-z0-9-]+$/
      puts "Image: #{basename}"
      puts "Only use the following lowercase letter, numbers and hypen."
      exit 1
    end
  end
  puts "Checking images filenames...done"
end
