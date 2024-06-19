function SkeletonLoading({ width }: { width: string }) {
  return (
    <div className="sketon-loader" style={{ width }}>
      <div className="sketion-shape"></div>
      <div className="sketion-shape"></div>
      <div className="sketion-shape"></div>
    </div>
  );
}

export default SkeletonLoading;
