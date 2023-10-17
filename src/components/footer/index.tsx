import SocialMedia from '@/components/share/social-media';

export const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-0 left-0 z-50 flex w-full transform space-x-14 overflow-hidden p-6 text-secondary-500 outline-none">
      <div>
        <SocialMedia url="social media link??" />
      </div>
      <div className="flex flex-1 justify-start space-x-14">
        <div>
          {/* logo EU */}

          <span className="block max-w-[376px] flex-wrap pr-2 text-[10px] leading-3">
            This project has received funding from the European Union&apos;s Horizon Europe research
            and innovation programme under{' '}
            <a href="" target="_blank" rel="noopener noreferrer">
              {' '}
              grant agreement No. 101059548.
            </a>
          </span>
        </div>
        <div className="flex  space-x-4 text-xs font-medium">
          <div>Attributions</div>
          <div>Disclaimer</div>
          <div>Terms of Use</div>
          <div>Privacy Policy</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
