###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
  activate :minify_html do |html|
    html.remove_multi_spaces = true
    html.remove_comments = true
    html.remove_intertag_spaces = true
  end
end

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css
  activate :minify_html do |html|
    html.remove_multi_spaces = true
    html.remove_comments = true
    html.remove_intertag_spaces = true
  end

  # Minify Javascript on build
  require "uglifier"
  activate :minify_javascript,
    compressor: proc {
     ::Uglifier.new()
    }
end

