Jekyll::Hooks.register :site, :after_init do |site|
  require 'rest-client'
  puts "Fetching videos..."
  filename = '_data/videos.json'

  if(ENV["YOUTUBE_API_KEY"]) then
    response = RestClient.get("https://www.googleapis.com/youtube/v3/playlistItems?part=id%2C%20contentDetails%2C%20snippet%2C%20status&playlistId=PLWn-GjQ4tNVngIY0M1QAUQogyXmaPXtGl&key=#{ENV["YOUTUBE_API_KEY"]}")
    File.write(filename, response.body)
  end

  puts "Fetching meetups...done"
end
