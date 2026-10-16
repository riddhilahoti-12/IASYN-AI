import { ESP32DeviceStatus } from '../types';
import { DEMO_ESP32_DEVICE } from './mockData';

export const hardwareService = {
  /**
   * Phase 1 / Phase 4 Interface: ESP32 Hardware Integration.
   * Web Serial API and USB serial communication will be implemented in Phase 4.
   */
  async getDeviceStatus(): Promise<ESP32DeviceStatus> {
    await new Promise((r) => setTimeout(r, 150));
    return DEMO_ESP32_DEVICE;
  },

  isWebSerialSupported(): boolean {
    return typeof navigator !== 'undefined' && 'serial' in navigator;
  }
};
