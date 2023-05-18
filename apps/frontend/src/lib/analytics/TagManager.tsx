import Script from 'next/script';

import { isTrackingAllowed } from './isTrackingAllowed';

export const TagManager: React.FunctionComponent<{
  host: string | null | undefined;
  id: string | null | undefined;
}> = ({ host, id }) => {
  if (!id || !host || !isTrackingAllowed(host)) return <></>;

  return (
    <>
      <Script
        id="googleTagManagerHeadScript"
        dangerouslySetInnerHTML={{ __html: TagManagerSnippets(id).Head }}
      />
      <noscript
        id="googleTagManagerBodyScript"
        dangerouslySetInnerHTML={{ __html: TagManagerSnippets(id).Body }}
      />
    </>
  );
};

export const TagManagerSnippets = (tagId: string) => ({
  Head: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${tagId}');`,
  Body: `<iframe src="https://www.googletagmanager.com/ns.html?id=${tagId}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
});
