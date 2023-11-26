import stream from 'stream'
import ffmpeg from 'fluent-ffmpeg'
import path from 'path'

class Player {
    constructor () {
        this.streamFile(null, null)
    }

    streamFile(mediaPath, format) {
        if (mediaPath == null) {
            this.stream = ffmpeg(path.join(process.cwd(), '/media/', `_empty.mp3`)).format("mp3").on('error', (err) => {
                console.error('FFmpeg error:', err);
            });
        } else {
            this.stream = ffmpeg(mediaPath).format(format).on('error', (err) => {
                console.error('FFmpeg error:', err);
            });
        }
    }
}

export default Player