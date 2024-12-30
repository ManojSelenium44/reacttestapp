import React, { useEffect, useRef, useState } from 'react';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { useReactMediaRecorder } from 'react-media-recorder';
import { Mic, Square, Play, Pause, Upload, Volume2, VolumeX } from 'lucide-react';
import WaveSurfer from 'wavesurfer.js';
import CustomPlayer from './CustomPlayer';

export default function ComplexControls() {
  const [captchaToken, setCaptchaToken] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const waveformRef = useRef<HTMLDivElement>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const closedShadowRef = useRef<HTMLDivElement>(null);

  const { status, startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: false,
    audio: true,
    onStop: (blobUrl) => {
      if (wavesurferRef.current) {
        wavesurferRef.current.load(blobUrl);
      }
    }
  });

  useEffect(() => {
    if (waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#4F46E5',
        progressColor: '#818CF8',
        cursorColor: '#C7D2FE',
        barWidth: 2,
        barGap: 1,
        // responsive: true,
        height: 60
      });

      return () => {
        wavesurferRef.current?.destroy();
      };
    }
  }, []);

  // Create closed shadow root
  useEffect(() => {
    if (closedShadowRef.current) {
      // Use a data attribute to track initialization
      if (!closedShadowRef.current.hasAttribute('data-shadow-root')) {
        const shadow = closedShadowRef.current.attachShadow({ mode: 'closed' });
        const content = document.createElement('div');
        content.innerHTML = `
          <style>
            .closed-content {
              padding: 1rem;
              background: #f3f4f6;
              border-radius: 0.5rem;
            }
          </style>
          <div class="closed-content">
            <p>This content is in a closed shadow root</p>
            <button>Hidden Button</button>
          </div>
        `;
        shadow.appendChild(content);
  
        // Mark as initialized
        closedShadowRef.current.setAttribute('data-shadow-root', 'true');
      }
    }
  }, []);
  
  
  

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="space-y-8">
      {/* Captcha Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Captcha Verification</h3>
        <HCaptcha
          sitekey="10000000-ffff-ffff-ffff-000000000001"
          onVerify={setCaptchaToken}
          data-testid="hcaptcha"
        />
      </div>

      {/* Video Player */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Video Player</h3>
        <div className="relative">
          <video
            ref={videoRef}
            className="w-full rounded-lg"
            data-testid="video-player"
          >
            <source src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center space-x-4">
            <button
              onClick={togglePlay}
              className="p-2 bg-white/80 rounded-full hover:bg-white"
              data-testid="play-button"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="p-2 bg-white/80 rounded-full hover:bg-white"
              data-testid="mute-button"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Audio Recorder */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Audio Recorder</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={status === 'recording' ? stopRecording : startRecording}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              data-testid="record-button"
            >
              {status === 'recording' ? (
                <>
                  <Square className="w-4 h-4" />
                  <span>Stop Recording</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Start Recording</span>
                </>
              )}
            </button>
          </div>
          <div ref={waveformRef} data-testid="waveform" />
          {mediaBlobUrl && (
            <audio src={mediaBlobUrl} controls className="w-full" data-testid="audio-player" />
          )}
        </div>
      </div>

      {/* File Upload */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">File Upload</h3>
        <div className="space-y-4">
          <label className="flex flex-col items-center px-4 py-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
              data-testid="file-input"
            />
          </label>
        </div>
      </div>

      {/* Shadow DOM Elements */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium mb-4">Shadow DOM Practice</h3>
        
        {/* Open Shadow DOM */}
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2">Open Shadow DOM</h4>
          <CustomPlayer />
        </div>
        
        {/* Closed Shadow DOM */}
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Closed Shadow DOM</h4>
          <div ref={closedShadowRef} data-testid="closed-shadow-root">
            This element contains a closed shadow root
          </div>
        </div>
      </div>
    </div>
  );
}