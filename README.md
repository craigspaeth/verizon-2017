# Verizon 2017

Verizon Annual Report project.

## Getting Started

1. Install [RVM](https://rvm.io/)
2. Install the latest Ruby `rvm install 2.4`
3. Install middleman `gem install middleman`
4. Install dependencies `bundle install`
5. Start the middleman server `middleman server`
6. Get to work `open http://localhost:4567`

## Converting & compressing video

You can use use ffmpeg to compress and convert video appropriate for HTML5 .mp4 embedding.

Install ffmpeg `brew install ffmpeg`

Run this script
````
for f in source/videos/*
do
  ffmpeg -i $f -vcodec libx264 -crf 25 -s 1280x720 ${f%.*}.min.mp4
done
````