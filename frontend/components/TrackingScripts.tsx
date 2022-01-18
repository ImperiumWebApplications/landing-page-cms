import Script from 'next/script';

export const TrackingScripts: React.FunctionComponent<{ consent: boolean }> = ({
  consent,
}) => {
  if (!consent) return <></>;

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=test`}
      />
    </>
  );
};
