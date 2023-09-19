import { html, css, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { io } from 'socket.io-client';

enum RecordingState {
    CONNECTING = 'connecting',
    ERROR = 'error',
    STOPPED = 'stopped',
    RECORDING = 'recording',
    PAUSED = 'paused'
}

@customElement('lit-page')
export class AudioStreamer extends LitElement {
    private socket: SocketIOClient.Socket;
    private audioContext: AudioContext;
    private mediaRecorder: MediaRecorder;
    private audioChunks: Blob[] = [];


    static styles = css`
        button {
            font-size:2em;
            padding:1em;
            font-weight:bold;
            margin: 1em;
        }
  `;

    @state()
    private _recordingState: RecordingState = RecordingState.STOPPED;

    constructor() {
        super();
        this.socket = io('http://m1.local:4000');
        this.audioContext = new AudioContext();
    }

    firstUpdated() {
        this.socket.on('audioBlob', (audioData: Blob) => {
            const audioBuffer = new AudioBuffer({ length: audioData.size, sampleRate: this.audioContext.sampleRate });
            const audioSrc = this.audioContext.createBufferSource();
            audioSrc.buffer = audioBuffer;
            audioSrc.connect(this.audioContext.destination);
            audioSrc.start();
        });
    }

    private async startRecording() {
        if (this._recordingState === RecordingState.RECORDING) {
            return;
        }
        this._recordingState = RecordingState.RECORDING;

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.mediaRecorder = new MediaRecorder(stream);

        this.mediaRecorder.ondataavailable = (event) => {
            this.audioChunks.push(event.data);
        };

        this.mediaRecorder.onstop = () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            this.socket.emit('audioBlob', audioBlob);
            this.audioChunks = [];
        };

        this.mediaRecorder.start();
    }

    private stopRecording() {
        if (this._recordingState === RecordingState.STOPPED) {
            return
        }
        this._recordingState = RecordingState.STOPPED;
        this.mediaRecorder.stop();
    }

    render() {
        return html`
        ${this._recordingState === RecordingState.STOPPED ? html`<button @click=${this.startRecording}>Start Recording</button>` : html`<button @click=${this.stopRecording}>Stop Recording</button>`}
      
    `;
    }
}
