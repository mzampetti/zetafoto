import CustomIcon from "@/components/Blocks/CustomIcon";
export default function ButtonBlock({
  label,
  border = false,
  color = "red",
  icon = "",
}) {
  return (
    <div
      className={`${border ? "" : ""} ${
        color === "red"
          ? "bg-accent text-white hover:bg-white group-hover:bg-white hover:text-accent group-hover:text-accent border border-accent"
          : ""
      } duration-200 py-1.5 rounded-full px-6 mt-4 inline-flex items-center`}
    >
      {icon && (
        <CustomIcon
          classes="size-4 bg-white group-hover:bg-accent -translate-x-2"
          fileName={icon}
        />
      )}
      <span className="uppercase tracking-widest text-sm font-medium">
        {label}
      </span>
    </div>
  );
}
