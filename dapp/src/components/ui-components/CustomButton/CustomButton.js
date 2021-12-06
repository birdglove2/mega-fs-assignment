import { Button } from '@mui/material';

const CustomButton = ({
  mainColor,
  secondaryColor,
  hoverBgColor = secondaryColor,
  hoverTextColor = mainColor,
  label,
  onClick,
  width = 24,
}) => {
  return (
    <Button
      class={`w-${width} p-2 border-2 border-black 
          bg-${mainColor} text-${secondaryColor} rounded 
          hover:bg-${hoverBgColor} hover:text-${hoverTextColor}
          active:bg-${hoverBgColor} active:text-${hoverTextColor}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default CustomButton;
