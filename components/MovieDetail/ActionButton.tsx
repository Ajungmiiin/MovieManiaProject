'use client';

const ActionButton = ({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) => {
  return (
    <button className="movie-detail-action-button" onClick={onClick}>
      {children}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
