import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { useResponsive } from './../../hooks/use-responsive';

import { bgBlur } from './../../theme/css';

import Iconify from './../../components/iconify';

// import Searchbar from './common/searchbar';
import { NAV, HEADER } from './config-layout';
import AccountPopover from './common/account-popover';
import LanguagePopover from './common/language-popover';

import { SelectButton } from 'primereact/selectbutton';
import {
  sales_dashboard_url,
  jooodah_dashboard_url,
  convince_dashboard_url,
  base_url,
} from '../../utils/base_url';

//

const GroupButton = () => {
  const options = [
    { title: `Joodah Dashboard`, url: jooodah_dashboard_url },
    { title: `Salesforce Dashboard`, url: sales_dashboard_url },
    { title: `Convince Dashboard`, url: convince_dashboard_url },
  ];

  let initState;
  if (base_url.includes('salesdashboard')) {
    initState = options[1];
  } else if (base_url.includes('convince')){
    initState = options[2];
  }else{
    initState = options[0];
  }

  const [value, setValue] = useState(initState);

  const justifyTemplate = (option) => {
    return (
      <a
        href={option.url}
        className={`h-full w-full  py-2 px-9 whitespace-nowrap flex scale-125`}
      >
        {option.title}
      </a>
    );
  };

  return (
    <div className="card flex justify-content-center">
      <div className="card flex flex-row justify-content-center">
        <SelectButton
          className="flex flex-row"
          value={value}
          itemTemplate={justifyTemplate}
          optionLabel="title"
          onChange={(e, t) => {
            setValue(e.value);
          }}
          options={options}
        />
      </div>
    </div>
  );
};
// ----------------------------------------------------------------------

export default function Header({ onOpenNav }) {
  const theme = useTheme();

  const lgUp = useResponsive('up', 'lg');

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      {/* <Searchbar /> */}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        {/* <LanguagePopover /> */}
        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <>
      <AppBar
        sx={{
          marginBottom: 20,
          boxShadow: 'none',
          height: HEADER.H_MOBILE,
          zIndex: theme.zIndex.appBar + 1,
          ...bgBlur({
            color: theme.palette.background.default,
          }),
          transition: theme.transitions.create(['height'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(lgUp && {
            width: `calc(100% - ${NAV.WIDTH + 1}px)`,
            height: HEADER.H_DESKTOP,
          }),
        }}
      >
        <div className="text-black w-auto m-auto mt-10 translate-y-9 z-[555] flex mb-3">
          <GroupButton />
        </div>
        <Toolbar
          sx={{
            height: 1,
            px: { lg: 5 },
          }}
        >
          {renderContent}
        </Toolbar>
      </AppBar>
      <div className="h-10"></div>
    </>
  );
}

Header.propTypes = {
  onOpenNav: PropTypes.func,
};
