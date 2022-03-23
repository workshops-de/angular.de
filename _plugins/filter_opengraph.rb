require 'fileutils'
require 'rest-client'
require 'rickshaw'

module Jekyll
  class OGFilter < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @enabled = ENV["JEKYLL_ENV"] == "production";
      # @enabled = true;
      @outputDir = text.strip.length > 0 ? text.strip + '/' : '';
    end

    def render(context)
      if(@enabled) then
        # This creates an image id hash from the page id in Jekyll
        slug = context["page"]["slug"]
        id = context["page"]["id"].to_sha1
        filename = "#{slug}_#{id}"

        unless(File.directory?("#{Dir.pwd}/opengraph/#{@outputDir}"))
          FileUtils.mkdir_p "#{Dir.pwd}/opengraph/#{@outputDir}"
        end

        # Check if the file already exists in the 'opengraph' foldler, return early if it does
        if(File.exist?("#{Dir.pwd}/opengraph/#{@outputDir}#{filename}.jpg"))
          # puts "File exists #{Dir.pwd}/opengraph/#{filename}.jpg"
        else
          # Using Node Canvas
          # the script to be called with the formatted title, and resolving filename
          background = if(context["page"]["header_image"]) then
            "#{File.expand_path("..", context["page"]["path"])}/#{context["page"]["header_image"]}"
          else
            "#{Dir.pwd}/opengraph/default.png"
          end
          script = "node #{Dir.pwd}/opengraph.js -t \"#{context["page"]["title"]}\" -d '#{context["page"]["date"].strftime("%e %B %Y")}' -a '#{context["page"]["author"]}' -b '#{background}' -o '#{Dir.pwd}/opengraph/#{@outputDir}#{filename}.jpg'"
          puts script
          system(script)
        end

        # Get the site variable
        site = context.registers[:site]

        # Add the file to the list of static_files needed to be copied to the _site
        site.static_files << Jekyll::StaticFile.new(site, site.source, "/opengraph/#{@outputDir}", "#{filename}.jpg")

        "/opengraph/#{@outputDir}#{filename}.jpg"
      else
        "/opengraph/default.png"
      end
    end
  end
end
Liquid::Template.register_tag('og_filter', Jekyll::OGFilter)
