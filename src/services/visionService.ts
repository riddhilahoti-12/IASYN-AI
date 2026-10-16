import { VisionModelMetadata } from '../types';
import { DEMO_VISION_MODELS } from './mockData';

export const visionService = {
  /**
   * Phase 1 / Phase 3 Interface: Computer Vision & Pose Analysis.
   * Real-time MediaPipe and OpenCV video stream processing will be connected in Phase 3.
   */
  async getRegisteredModels(): Promise<VisionModelMetadata[]> {
    await new Promise((r) => setTimeout(r, 150));
    return DEMO_VISION_MODELS;
  },

  async checkCameraAvailability(): Promise<{ available: boolean; label?: string }> {
    if (typeof navigator !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoInput = devices.find((d) => d.kind === 'videoinput');
        return { available: !!videoInput, label: videoInput?.label || 'Webcam detected' };
      } catch (err) {
        return { available: false, label: 'Camera permission denied or unavailable' };
      }
    }
    return { available: false, label: 'Browser mediaDevices API not supported' };
  }
};
