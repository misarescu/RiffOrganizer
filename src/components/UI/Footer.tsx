import React from 'react';

type FooterProps = {
  className?: string;
};

const FooterClass =
  'indent-0 text-sm md:text-base text-slate-400 dark:text-slate-600 text-center font-serif mt-4 border-t-2 border-slate-400 dark:border-slate-600';

function Footer(props: FooterProps) {
  return (
    <footer className={`${FooterClass} ${props.className}`}>
      <p>
        This is a side project with the aim to help keep track of your guitar
        progress
      </p>
      <p>
        For more info and contact please check the email:{' '}
        {/* for now i hardcoded my proton email */}
        <em>
          <a
            className='text-blue-500/70 dark:text-blue-400/70'
            href='mailto: mihai.isarescu@protonmail.com'>
            mihai.isarescu@protonmail.com
          </a>
        </em>
      </p>
      <p>
        For feature requests or bugfixes please check the{' '}
        <em>
          <a
            href='https://github.com/redshadowfx/RiffOrganizer'
            className='text-blue-500/70 dark:text-blue-400/70'>
            Github
          </a>
        </em>{' '}
        repository
      </p>
    </footer>
  );
}

export default Footer;
