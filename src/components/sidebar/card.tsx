function SidebarDatasetCard({ children, color }) {
  return (
    <div className="bg-white-950 p-6" style={{ borderLeft: `1px solid ${color}` }}>
      {children}
    </div>
  );
}

export default SidebarDatasetCard;
