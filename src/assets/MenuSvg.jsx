const MenuSvg = ({ openNavigation }) => {
  return (
    <svg
      className="overflow-visible"
      width="24"
      height="16"
      viewBox="0 0 24 16"
    >
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "7" : "0"}
        width="24"
        height="2"
        rx="1"
        fill="currentColor"
        transform={`rotate(${openNavigation ? "45" : "0"})`}
      />
      <rect
        className="transition-all origin-center"
        y={openNavigation ? "7" : "14"}
        width="24"
        height="2"
        rx="1"
        fill="currentColor"
        transform={`rotate(${openNavigation ? "-45" : "0"})`}
      />
    </svg>
  );
};

export default MenuSvg;