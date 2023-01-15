import os
from moviepy.editor import *


def merge_comment(comment_name:str):
	audio_name = comment_name[8:len(comment_name)]
	audio_name = "Voice-" + audio_name[:len(audio_name)-4] + ".mp3"

	audio_file = AudioFileClip("./RedditImages/Comments/"+audio_name)
	image_file = ImageClip("./RedditImages/Comments/"+comment_name).resize(0.2).set_audio(audio_file).set_duration(audio_file.duration)

	return image_file

files = os.listdir(os.curdir + "/RedditImages/Comments")
files = list(filter(lambda x: (x.endswith(".png")),files))

clips = []
for file in files:
	clips.append(merge_comment(file))

merged_clips = concatenate_videoclips(clips)
merged_clips = merged_clips.set_pos("center")

#a = AudioFileClip("./RedditImages/Comments/Voice-akumajfr-15327.mp3")
#t = ImageClip("./RedditImages/Comments/comment-akumajfr-15327.png")
#t = t.resize(0.2)
#t = t.set_audio(a)
#t = t.set_duration(a.duration)
#t = t.set_pos("center")

clip = VideoFileClip("Video.mp4").subclip(0,merged_clips.duration)
clip = clip.volumex(0)

video = CompositeVideoClip([clip,merged_clips],size=(1920,1080))

video.write_videofile("export.mp4")