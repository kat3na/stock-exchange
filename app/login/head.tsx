// app/login/head.tsx
import Head from 'next/head'
import Script from 'next/script'

export default function LoginHead() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
        />
        <meta
          name="description"
          content="Render is a unified cloud to build and run all your apps and websites with free SSL, global CDN…"
        />
        <meta property="og:title" content="Cloud Application Hosting for Developers | Render" />
        <meta
          property="og:description"
          content="Render is a unified cloud to build and run all your apps and websites with free SSL, global CDN…"
        />
        <meta property="og:image" content="https://render.com/og-img.png" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en" />
        <meta property="og:site_name" content="Cloud Application Hosting for Developers | Render" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@render" />
        <meta name="twitter:title" content="Cloud Application Hosting for Developers | Render" />
        <meta
          name="twitter:description"
          content="Render is a unified cloud to build and run all your apps and websites with free SSL, global CDN…"
        />
        <meta name="twitter:image" content="https://render.com/twitter-img.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon-light.png" />
        <title>Render · The Easiest Cloud For All Your Apps</title>
      </Head>

      {/* Consent & analytics setup */}
      <Script id="gtag-consent" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent','default',{
            'ad_storage':'denied',
            'analytics_storage':'denied',
            'ad_user_data':'denied',
            'ad_personalization':'denied',
            'personalization_storage':'denied',
            'functionality_storage':'granted',
            'security_storage':'granted',
            'wait_for_update': 500
          });
          gtag("set", "ads_data_redaction", true);
        `}
      </Script>
      <Script
        async
        src="https://cmp.osano.com/AzZf4RUVBUPZc66vt/5eefab51-58ce-4b25-9547-c1676055a663/osano.js"
        strategy="beforeInteractive"
      />
      <Script id="gtm" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N644GXSK');
        `}
      </Script>
      <Script src="https://js.stripe.com/v3/" strategy="afterInteractive" />
      <Script
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/21532664.js"
        strategy="afterInteractive"
      />
      {/* hide Osano widget until ready */}
      <style>{`.osano-cm-widget, .osano-cm-dialog { display: none; }`}</style>
    </>
  )
}
