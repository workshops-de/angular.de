Jekyll::Hooks.register :site, :after_init do |p|
  Dir["_posts/*"].each do |file|
    folder_name = File.basename(file)
    check_file = "#{file}/#{folder_name}.md"

    if !File.exist?(check_file)
      puts "Error in folder #{file} - Needs post file with the same name as folder"
      exit 1
    end
  end
end
