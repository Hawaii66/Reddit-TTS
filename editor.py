import os

from moviepy.editor import *
from moviepy.video.fx.all import crop


def merge_comment(comment_name:str):
	audio_name = comment_name[8:len(comment_name)]
	audio_name = "Voice-" + audio_name[:len(audio_name)-4] + ".mp3"

	audio_file = AudioFileClip("./RedditImages/Comments/"+audio_name)
	image_file = ImageClip("./RedditImages/Comments/"+comment_name).resize(0.2).set_audio(audio_file).set_duration(audio_file.duration)

	return image_file

files = os.listdir(os.curdir + "/RedditImages/Comments")
files = list(filter(lambda x: (x.endswith(".png")),files))

question_audio = AudioFileClip("./RedditImages/Voice.mp3")
question_image = ImageClip("./RedditImages/Question.png").resize(0.2).set_audio(question_audio).set_duration(question_audio.duration)

clips = [question_image]

max_duration_total = 50
max_duration_per_clip = 20
duration = question_image.duration
for file in files:
	video = merge_comment(file)
	if video.duration > max_duration_per_clip:
		continue
	
	duration += video.duration
	if duration > max_duration_total:
		break
	
	clips.append(video)

	break

merged_clips = concatenate_videoclips(clips)
merged_clips = merged_clips.set_pos("center")
clip = VideoFileClip("Video.mp4").subclip(0,merged_clips.duration)

def create_tiktok(clip,merged_clips):
	clip = crop(clip,x1=(1920/2)-(1080/2),y1=0,x2=(1920/2)+(1080/2),y2=1080)
	clip = clip.resize(16/9)
	clip = clip.volumex(0).set_pos("center")

	video = CompositeVideoClip([clip,merged_clips],size=(1080,1920))

	return video

def create_youtube(clip,merged_clips):
	clip = clip.volumex(0)

	video = CompositeVideoClip([clip,merged_clips],size=(1920,1080))

	return video

tiktok = create_tiktok(clip,merged_clips)
tiktok.write_videofile("tiktok.mp4")

youtube = create_youtube(clip,merged_clips)
youtube.write_videofile("youtube.mp4")