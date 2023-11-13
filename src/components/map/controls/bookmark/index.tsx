import { useState, useCallback } from 'react';
import type { FC, FormEvent, MouseEvent } from 'react';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

import { Cross2Icon } from '@radix-ui/react-icons';
import { AiFillStar } from 'react-icons/ai';
import { useLocalStorage } from 'usehooks-ts';

import { CONTROL_BUTTON_STYLES, CONTROL_ICON_STYLES } from '@/components/map/controls/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const PREFIX = 'OEMC';

export const BookmarkControl: FC = () => {
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarks, setBookmarks] = useLocalStorage<{ name: string; value: string }[]>(
    `${PREFIX}-bookmarks`,
    []
  );
  const [isInputVisible, setInputVisibility] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const url = `${pathname}?${searchParams.toString()}`;

  const handleSaveBookmark = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const nextBookmarks = [...bookmarks, { name: bookmarkName, value: url }];
      setBookmarks(nextBookmarks);
      setInputVisibility(false);
      setBookmarkName(''); // reset input
    },
    [bookmarkName, bookmarks, setBookmarks, url]
  );

  const handleRemoveBookmark = useCallback(
    (keyName: string) => {
      const nextBookmarks = bookmarks.filter(({ name }) => name !== keyName);
      setBookmarks(nextBookmarks);
    },
    [bookmarks, setBookmarks]
  );

  const handleInputChange = useCallback((e: FormEvent<HTMLInputElement>) => {
    setBookmarkName(e.currentTarget?.value);
  }, []);

  return (
    <Sheet>
      <SheetTrigger className={CONTROL_BUTTON_STYLES.default}>
        <AiFillStar className={CONTROL_ICON_STYLES.default} />
      </SheetTrigger>
      <SheetContent className="relative flex h-full flex-col space-y-6 bg-brand-500 bg-opacity-[0.9] pl-10">
        <SheetHeader className="space-y-6">
          <SheetTitle className="text-2xl font-bold text-secondary-500">Bookmarks</SheetTitle>
          <div className="scroll-y-auto">
            {!bookmarks.length && !isInputVisible && <div>No bookmarks yet.</div>}

            {isInputVisible && (
              <div>
                <div className="flex items-center">
                  <AiFillStar className="h-5 w-5" />
                  <input
                    type="text"
                    defaultValue=""
                    placeholder="Insert bookmark name..."
                    className="w-full border-none bg-transparent py-2.5 outline-none placeholder:bg-transparent placeholder:text-secondary-500"
                    onChange={handleInputChange}
                    autoFocus={true}
                  />
                </div>
                <div className="overflow-hidden break-words pl-8 text-sm text-[#848981]">{url}</div>
                <div className="flex space-x-4 py-7">
                  <Button
                    type="submit"
                    onClick={handleSaveBookmark}
                    className="flex w-full items-center"
                    disabled={!bookmarkName}
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    onClick={() => setInputVisibility(false)}
                    className="flex w-full items-center"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetHeader>

        {!isInputVisible && (
          <Button className="w-full" onClick={() => setInputVisibility(true)}>
            Bookmark current URL
          </Button>
        )}

        {bookmarks.length > 0 && (
          <div className="relative h-full">
            <ul className="after:content relative h-full flex-1 overflow-y-auto">
              {bookmarks.map(({ name, value }) => (
                <li
                  key={name}
                  className="border-t-0.5 flex items-center justify-between border-b border-t-[0.5px] border-dashed border-brand-50 py-2.5"
                >
                  <div className="flex items-center space-x-2">
                    <AiFillStar className="h-5 w-5" />
                    <Link href={value}>{name}</Link>
                  </div>
                  <button type="button" onClick={() => handleRemoveBookmark(name)}>
                    <Cross2Icon className="h-3 w-3" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default BookmarkControl;
