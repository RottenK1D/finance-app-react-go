type Props = {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  sideText: string;
};

const BoxHeader = ({ icon, title, subtitle, sideText }: Props) => {
  return (
    <div className="flex justify-between items-center text-foreground mx-4 mt-2 mb-0">
      <div className="flex justify-between items-center">
        {icon}
        <div className="w-full">
          <h4 className="font-semibold tracking-tight">{title}</h4>
          <p className="leading-7 text-xs text-secondary-foreground">
            {subtitle}
          </p>
        </div>
      </div>
      <p className="leading-7 font-extrabold">{sideText}</p>
    </div>
  );
};

export default BoxHeader;
