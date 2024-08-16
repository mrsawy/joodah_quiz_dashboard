import { Helmet } from 'react-helmet-async';

// import { UserView } from 'src/sections/user/view';
import { LevelsView } from './../sections/levels/view';

// ----------------------------------------------------------------------

export default function LevelPage() {
  return (
    <>
      <Helmet>
        <title> Levels </title>
      </Helmet>

      <LevelsView />
    </>
  );
}
