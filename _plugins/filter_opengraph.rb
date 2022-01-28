require 'rest-client'
require 'rickshaw'

module Jekyll
  class OGFilter < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @enabled = ENV["JEKYLL_ENV"] == "production";
      # @enabled = true;
      # @generator = 'apiflash'
      @outputDir = text.strip
    end

    def render(context)
      if(@enabled) then
        # This creates an image id hash from the page id in Jekyll
        slug = context["page"]["slug"]
        id = context["page"]["id"].to_sha1
        filename = "#{slug}_#{id}"

        # Check if the file already exists in the 'opengraph' foldler, return early if it does
        if(File.exist?("#{Dir.pwd}/opengraph/#{@outputDir}/#{filename}.jpg"))
          # puts "File exists #{Dir.pwd}/opengraph/#{filename}.jpg"
        else
          if (@generator == 'apiflash') then
            # Using Apiflash
            url = "https://angular.de#{context["page"]["url"]}"

            image = Net::HTTP.get(URI.parse("https://api.apiflash.com/v1/urltoimage?access_key=2fe1e7a195d54b4e80480e8db371aff5&url=#{url}&width=1200&height=627&no_cookie_banners=true&no_ads=true&no_tracking=true&quality=100"))
            File.write("#{Dir.pwd}/opengraph/#{@outputDir}/#{filename}.jpg", image)
          else
            # Using Node Canvas
            # the script to be called with the formatted title, and resolving filename
            script = "node #{Dir.pwd}/opengraph.js -t \"#{context["page"]["title"]}\" -d '#{context["page"]["date"].strftime("%e %B %Y")}' -a '#{context["page"]["author"]}' -b '#{File.expand_path("..", context["page"]["path"])}/#{context["page"]["header_image"]}' -o '#{Dir.pwd}/opengraph/#{@outputDir}/#{filename}.jpg'"
            puts script
            system(script)
          end
        end

        # Get the site variable
        site = context.registers[:site]

        # Add the file to the list of static_files needed to be copied to the _site
        # site.static_files << Jekyll::StaticFile.new(site, site.source, "/opengraph/#{@outputDir}/", "#{filename}.jpg")

        "/opengraph/#{@outputDir}/#{filename}.jpg"
      else
        "/opengraph/default.png"
      end
    end
  end
end
Liquid::Template.register_tag('og_filter', Jekyll::OGFilter)
