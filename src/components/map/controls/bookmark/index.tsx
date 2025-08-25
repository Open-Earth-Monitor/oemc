import { useState, useCallback } from 'react';
import type { FC, FormEvent, MouseEvent } from 'react';

import { usePathname } from 'next/navigation';

import { Cross2Icon } from '@radix-ui/react-icons';
import { getWidth } from 'ol/extent';
import { get as getProjection } from 'ol/proj';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useLocalStorage } from 'usehooks-ts';

import { CONTROL_BUTTON_STYLES } from '@/components/map/controls/constants';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

const PREFIX = 'OEMC';

const getUrlParameter = (url, name) => {
  const results = new RegExp('[?&]' + name + '=([^&#]*)').exec(url);
  return results ? decodeURIComponent(results[1]) : null;
};

const createBBox = (center, zoom) => {
  const projection = getProjection('EPSG:3857');
  const resolution = getWidth(projection.getExtent()) / 256 / Math.pow(2, zoom); // resolution
  const delta = (resolution * 256) / 2; // We need it to know how much we move in X and Y from that center to get the  Bbox

  const [x, y] = center;
  const bbox = [
    [x - delta, y - delta], // bottom left corner
    [x + delta, y + delta], // top right corner
  ];

  return bbox;
};

export const BookmarkControl: FC<{ isMobile?: boolean }> = ({
  isMobile,
}: {
  isMobile?: boolean;
}) => {
  const [bookmarkName, setBookmarkName] = useState('');
  const [bookmarks, setBookmarks] = useLocalStorage<{ name: string; value: string }[]>(
    `${PREFIX}-bookmarks`,
    []
  );

  const [isInputVisible, setInputVisibility] = useState(false);
  const pathname = usePathname();

  // TO - DO - update url with useSearchParams
  const url = `${pathname}${window.location.search}`;

  // update as necessary
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

  // const handleClick = (value) => {
  //   const urlParams = value.target.getAttribute('data-value');

  //   const center = getUrlParameter(urlParams, 'center');
  //   const zoom = getUrlParameter(urlParams, 'zoom');

  //   const centerCoords = center ? JSON.parse(center) : null;
  //   const zoomValue = zoom ? parseFloat(zoom) : null;

  //   if (centerCoords && zoomValue) {
  //     const bbox = createBBox(centerCoords, zoomValue);

  //   }
  // };

  return (
    <Sheet>
      <SheetTrigger
        className={isMobile ? CONTROL_BUTTON_STYLES.mobile : CONTROL_BUTTON_STYLES.default}
      >
        <AiOutlineStar size={22} strokeWidth={2} />
      </SheetTrigger>
      <SheetContent
        side="right"
        className="relative z-[700] flex h-full max-w-sm flex-col space-y-6 bg-brand-500 bg-opacity-90 sm:pl-10"
      >
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
                    className="w-full border-none bg-transparent py-2.5 outline-none placeholder:bg-transparent placeholder:text-secondary-500 focus:ring-[0.2px] focus:ring-[#848981] focus:ring-opacity-50"
                    onChange={handleInputChange}
                    autoFocus={true}
                  />
                </div>
                <div className="overflow-hidden break-words pl-8 pt-2 text-sm text-[#848981]">
                  {url}
                </div>
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
          <Button
            className="h-11 w-full text-brand-500 sm:h-9"
            onClick={() => setInputVisibility(true)}
          >
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
                    <a data-value={value} href={value}>
                      {name}
                    </a>
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
