export function Video({ src, type = 'video/mp4' }: { src?: string; type?: string }) {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="absolute left-0 top-0 z-0 h-screen w-screen object-cover"
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}

export default Video;
