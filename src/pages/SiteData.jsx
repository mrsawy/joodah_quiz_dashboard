import { Helmet } from 'react-helmet-async';

import { SiteDataView } from './../sections/siteData/view';

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> site data </title>
      </Helmet>

      <SiteDataView />
    </>
  );
}
