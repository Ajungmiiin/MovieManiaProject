const NoticeMessage = ({ message }: { message: string }) => {
  return (
    <p className="toast border-l-8 border-black">
      <span>{message}</span>
    </p>
  );
};

export default NoticeMessage;
