Jekyll::Hooks.register :site, :pre_render do |site|
  require 'rest-client'
  puts "Fetching OG Images..."

  if(ENV["JEKYLL_ENV"] == "production") then
    site.collections['pages'].docs.each { |page|
      slug = page.data['slug']
      url = "https://angular.de#{page.url}"

      puts "Writing OG Image #{slug}"
      image = Net::HTTP.get(URI.parse("https://api.apiflash.com/v1/urltoimage?access_key=2fe1e7a195d54b4e80480e8db371aff5&url=#{url}&width=1200&height=627&no_cookie_banners=true&no_ads=true&no_tracking=true&quality=100"))
      #image = Net::HTTP.get(URI.parse("https://api.apiflash.com/v1/urltoimage?access_key=2fe1e7a195d54b4e80480e8db371aff5&url=#{url}&width=600&height=314&no_cookie_banners=true&no_ads=true&no_tracking=true&quality=100&scale_factor=2"))
      File.write("assets/img/ogimages/#{slug}.jpg", image)
    }
    puts "Fetching OG Images...done"
  else
    puts "JEKYLL_ENV NOT PRODUCTION - OG Images fetch aborted"
  end
end
