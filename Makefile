share:
	middleman build
	mv -v build/* /Volumes/Macintosh\ HD/Users/craigspaeth/dropbox/Dropbox\ \(Personal\)/Apps/KISSr/craigspaeth.kissr.com
	open http://craigspaeth.kissr.com

compress:
	for f in ./source/videos/*.mpeg ; do \
	  ffmpeg -i $$f -vcodec libx264 -crf 25 -s 1280x720 $(basename $$f .mpeg).min.mp4 ; \
	done ; \
	for f in ./source/videos/*.mp4 ; do \
	  ffmpeg -i $$f -vcodec libx264 -crf 25 -s 1280x720 $(basename $$f .mp4).min.mp4 ; \
	done ; \
	for f in ./source/videos/*.m4v ; do \
	  ffmpeg -i $$f -vcodec libx264 -crf 25 -s 1280x720 $(basename $$f .m4v).min.mp4 ; \
	done