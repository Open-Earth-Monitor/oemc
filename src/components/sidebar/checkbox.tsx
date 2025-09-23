import { Label } from '@/components/ui/label';

import { Checkbox, CheckboxIndicator } from '../ui/checkbox';

type SidebarCheckboxProps = {
  setShowDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

function SidebarCheckbox({ setShowDetail }: SidebarCheckboxProps) {
  const handleSelect = () => {
    setShowDetail((prev) => !prev);
  };

  return (
    <Checkbox
      id="detail"
      data-testid="detail-checkbox"
      defaultChecked
      onCheckedChange={handleSelect}
      className="group peer flex w-fit items-center justify-between gap-2"
    >
      <Label
        htmlFor="detail"
        className="whitespace-nowrap text-white-500 group-data-[state=checked]:text-accent-green"
      >
        Show details
      </Label>
      <div
        className="flex h-4
            w-4 items-center justify-center rounded-full border-2
            border-white-500 bg-transparent transition
            group-data-[state=checked]:border-accent-green
            group-data-[state=checked]:bg-accent-green

          "
      >
        <div className="bg-black group-data-[state=checked]:bg-black flex h-full w-full items-center justify-center rounded-full bg-transparent">
          <CheckboxIndicator className="h-3.5 w-3.5 shrink-0 rounded-full p-0.5 data-[state=checked]:border-2 data-[state=checked]:border-black-500" />
        </div>
      </div>
    </Checkbox>
  );
}

export default SidebarCheckbox;
