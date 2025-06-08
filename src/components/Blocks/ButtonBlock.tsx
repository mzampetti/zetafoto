import CustomIcon from "@/components/Blocks/CustomIcon";

type Props = {
  label: string;
  color?: string;
};

export default function ButtonBlock({ label, color }: Props) {
  return (
    <div
      className={`${
        color === "white"
          ? "bg-primary text-secondary group-hover:bg-primary/80"
          : "bg-secondary text-primary group-hover:bg-secondary/90"
      }  leading-none inline-block  duration-200 py-2 pb-3 rounded-md px-4 mt-4`}
    >
      <span className="text-[13px] font-bold pb-2">{label}</span>
    </div>
  );
}
