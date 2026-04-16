interface CustomTooltipProps {
  active?: boolean;
  payload?: { value: string | number }[];
  labelSuffix?: string;
}

const CustomTooltip = ({ active, payload, labelSuffix = "Active devices" }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  const value = payload[0].value;

  return (
    <div
      style={{
        background: "#5B3DF5",
        color: "white",
        padding: "6px 12px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: 500,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      }}
    >
      {value} {labelSuffix}
    </div>
  );
};

export default CustomTooltip;
