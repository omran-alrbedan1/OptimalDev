import { Button } from "antd";

const CustomButton = ({
  content,
  onClick,
}: {
  content: string;
  onClick?: () => void;
}) => {
  return (
    <Button
      type="primary"
      className="px-4 py-5 hover:!bg-white hover:!text-primary-color1  !border-primary-color1 border-3 hover:scale-105 duration-200 transition-all "
      onClick={onClick}
    >
      {content}
    </Button>
  );
};

export default CustomButton;
