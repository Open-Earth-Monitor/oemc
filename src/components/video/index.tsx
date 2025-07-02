export function Video({
  src,
  type = 'video/mp4',
  className,
}: {
  src?: string;
  type?: string;
  className: string;
}) {
  return (
    <video autoPlay loop muted playsInline preload="auto" className={className}>
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
}

export default Video;
