# Profile banner

The animated banner at the top of the profile README. It is an HTML page that
HyperFrames renders to video, and ffmpeg then turns into a GIF.

To change it, edit `index.html`, then from this folder run:

```bash
npx hyperframes@0.9.27 check
npx hyperframes@0.9.27 render --quality delivery -o out/banner.mp4
ffmpeg -y -i out/banner.mp4 -filter_complex "fps=15,scale=960:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=96:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle" -loop 0 ../assets/profile-banner.gif
```
