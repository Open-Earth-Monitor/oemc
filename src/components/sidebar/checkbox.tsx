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
      className="peer-data-[state=checked]:text-accent-green-500 flex w-fit items-center space-x-3.5 text-white-500"
    >
      <Label htmlFor="detail" className="whitespace-nowrap">
        Show details
      </Label>
      <div className="flex rounded-full border-2 border-accent-green">
        <CheckboxIndicator />
      </div>
    </Checkbox>
  );
}

export default SidebarCheckbox;
