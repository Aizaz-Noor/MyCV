"""Compose the captured scenes into a silent LinkedIn MP4. Requires ffmpeg/ffprobe."""
import json
from pathlib import Path
import subprocess

out = Path('launch/exports')
manifest = json.loads((out / 'capture-manifest.json').read_text(encoding='utf-8-sig'))

def run(args):
    subprocess.run(args, check=True)

def duration(file):
    return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', str(file)], text=True))

parts = []
for scene in manifest['scenes']:
    raw = out / scene['file']
    length = min(scene['duration'], duration(raw))
    start = max(0, duration(raw) - length - .12)
    dest = out / f"part-{scene['id']}.mp4"
    mobile = scene['id'] == 'mobile'
    size = '342:740' if mobile else '1008:700'
    position = '(W-w)/2:445' if mobile else '36:475'
    filters = f'[1:v]scale={size}:flags=lanczos,setsar=1[v];[0:v][v]overlay={position}:shortest=1,fps=30,format=yuv420p'
    run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y', '-loop', '1', '-i', str(out / f"video-{scene['id']}.png"), '-ss', str(start), '-i', str(raw), '-filter_complex', filters, '-t', str(length), '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '19', '-threads', '2', str(dest)])
    parts.append(dest)
    print('Rendered', scene['id'], round(length, 1), 's', flush=True)
# A short opening uses the hero clip immediately; the end card provides the URL.
end = out / 'part-outro.mp4'
run(['ffmpeg','-hide_banner','-loglevel','error','-y','-loop','1','-i',str(out/'video-outro.png'),'-t','3.5','-vf','fps=30,format=yuv420p','-an','-c:v','libx264','-preset','fast','-crf','19','-threads','2',str(end)])
parts.append(end)
concat = out / 'concat.txt'
concat.write_text(''.join(f"file '{part.name}'\n" for part in parts), encoding='utf-8')
final = out / 'aizaz-noor-portfolio-linkedin.mp4'
run(['ffmpeg','-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',str(concat),'-c','copy','-movflags','+faststart',str(final)])
metadata = subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration,size:stream=codec_name,width,height,avg_frame_rate,pix_fmt','-of','json',str(final)],text=True)
(out/'video-metadata.json').write_text(metadata,encoding='utf-8')
print(metadata)

