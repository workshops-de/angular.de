Jekyll::Hooks.register :posts, :post_render do |p|
  if p.content.include?(%{<div class="highlighter-rouge">})
    puts "\n\n# Always specify the language!!!"
    puts p.path
  end
end

Jekyll::Hooks.register :pages, :post_render do |p|
  if p.content.include?(%{<div class="highlighter-rouge">})
    puts "\n\n# Always specify the language!!!"
    puts p.path
  end
end


