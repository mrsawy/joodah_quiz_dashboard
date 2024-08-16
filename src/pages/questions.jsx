import { Helmet } from 'react-helmet-async';

import { QuestionsView } from './../sections/questions/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Questions </title>
      </Helmet>

      <QuestionsView />
    </>
  );
}
