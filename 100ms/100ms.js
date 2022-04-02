import HmsManager, {
  HMSTrackSettings,
  HMSAudioTrackSettings,
  HMSVideoTrackSettings,
  HMSVideoCodec,
  HMSCameraFacing,
  HMSVideoResolution,
} from '@100mslive/react-native-hms';

const getTrackSettings = () => {
  let audioSettings = new HMSAudioTrackSettings({
    maxBitrate: 32,
    trackDescription: 'Simple Audio Track',
  });
  let videoSettings = new HMSVideoTrackSettings({
    codec: HMSVideoCodec.VP8,
    maxBitrate: 512,
    maxFrameRate: 25,
    cameraFacing: HMSCameraFacing.FRONT,
    trackDescription: 'Simple Video Track',
    resolution: new HMSVideoResolution({height: 180, width: 320}),
  });

  return new HMSTrackSettings({video: videoSettings, audio: audioSettings});
};

export const setupBuild = async () => {
  const trackSettings = getTrackSettings();
  const build = await HmsManager.build({trackSettings});

  return build;
};
