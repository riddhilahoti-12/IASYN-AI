import React from 'react';
import { Cpu, RefreshCw, CheckCircle2, AlertCircle, HardDrive, Usb, Sliders } from 'lucide-react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { DEMO_ESP32_DEVICE } from '../../services/mockData';
import { hardwareService } from '../../services/hardwareService';

export const AdminDeviceManagementPage: React.FC = () => {
  const device = DEMO_ESP32_DEVICE;
  const isWebSerialSupported = hardwareService.isWebSerialSupported();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-demo">Hardware Fleet Registry</span>
            <Badge variant="warning">Phase 4 USB Serial Ready</Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">ESP32 Biofeedback Device Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            USB serial port provisioning, firmware over-the-air deployment, and LCD/LED multimodal feedback controllers
          </p>
        </div>

        <Button variant="outline" size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
          Scan USB Ports
        </Button>
      </div>

      {/* Web Serial Status Banner */}
      <div className="p-4 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-3">
        <Usb className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">
            Host Browser Serial API Capability: {isWebSerialSupported ? 'Supported' : 'Standard WebSerial Mode'}
          </p>
          <p className="text-slate-500 leading-relaxed">
            IASYN AI will communicate with clinical ESP32 microcontrollers over USB CDC (115200 baud) in Phase 4. The ESP32 drives an I2C 16x2 / 20x4 LCD for real-time rep counts, dual WS2812B RGB posture indicators (Green/Amber/Red), and a PWM buzzer for audio pace chimes.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Configuration Card */}
        <Card variant="default">
          <CardHeader
            title="Registered Primary Biofeedback Module"
            subtitle={`Hardware ID: ${device.deviceId}`}
          />

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Serial Port Mapping</span>
              <span className="font-mono font-medium text-slate-900">{device.serialPort}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Baud Rate</span>
              <span className="font-mono font-medium text-slate-900">{device.baudRate} bps</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Firmware Build</span>
              <span className="font-medium text-brand-700">{device.firmwareVersion}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Connection State</span>
              <Badge variant="neutral" size="sm">Idle / Standby (Phase 1 Shell)</Badge>
            </div>
          </div>
        </Card>

        {/* Peripherals & Actuators Card */}
        <Card variant="default">
          <CardHeader
            title="Hardware Actuators & Outputs"
            subtitle="Multimodal patient guidance peripherals"
          />

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">I2C LCD Feedback Display</span>
                <span className="text-[11px] text-slate-500">Displays real-time reps, hold timer, and error cues</span>
              </div>
              <Badge variant="active" size="sm">Driver Ready</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">RGB Status LED Strip</span>
                <span className="text-[11px] text-slate-500">Visual posture alignment (Green: Good, Red: Asymmetric)</span>
              </div>
              <Badge variant="active" size="sm">Driver Ready</Badge>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800 block">Audio Frequency Chime</span>
                <span className="text-[11px] text-slate-500">Acoustic metronome for cadence guidance</span>
              </div>
              <Badge variant="active" size="sm">Driver Ready</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
