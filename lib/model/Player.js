import ffmpeg from 'fluent-ffmpeg'
import path from 'path'
import { PassThrough } from 'stream'

class Player {
    constructor () {
        this.streamFile(null, null)
    }

    outputs = []

    getOutput () {
        let str = new PassThrough()

        this.outputs.push(str)
        
        return str
    }

    

    streamFile(mediaPath, format) {
        if (mediaPath == null) {
            this.stream = ffmpeg(path.join(process.cwd(), '/media/', `_empty.mp3`)).format("mp3").on('error', (err) => {
                console.error('FFmpeg error:', err);
            })
        } else {
            this.stream = ffmpeg(mediaPath).format(format).on('error', (err) => {
                console.error('FFmpeg error:', err);
            });
        }
        this.stream.pipe().on('data', (chunk) => {
            this.outputs.forEach((output) => {
                output.push(chunk)
            })
        })
    }
}

export default Player