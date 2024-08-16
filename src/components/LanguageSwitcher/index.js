import React, { useEffect, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';

import EnglishFlag from './EnglishFlag';
import SaudiArabiaFlag from './SaudiArabiaFlag';

const countryOptionTemplate = (option) => {
  return (
    <div className="flex align-items-center">
      {option?.code == `ar` ? <SaudiArabiaFlag /> : <EnglishFlag />}
      <div>{option.name}</div>
    </div>
  );
};

const selectedCountryTemplate = (option, props) => {
  if (option) {
    return (
      <div className="flex align-items-center">
        {option?.code == `ar` ? <SaudiArabiaFlag /> : <EnglishFlag />}
        <div>{option.name}</div>
      </div>
    );
  }

  return <span>{props.placeholder}</span>;
};

function LanguageSwitcher({ className }) {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: t('arabic'), code: 'ar' },
    { name: t('english'), code: 'en' },
  ];

  useEffect(() => {
    if (currentLanguage == `ar`) {
      setSelectedCity({ name: t('arabic'), code: 'ar' });
    } else if (currentLanguage == `en`) {
      setSelectedCity({ name: t('english'), code: 'en' });
    }
  }, [currentLanguage]);

  return (
    <div className={`card flex justify-content-center ${className}`}>
      <Dropdown
        value={selectedCity}
        onChange={(e) => {
          changeLanguage(e.value.code);
          setSelectedCity(e.value);
        }}
        options={cities}
        optionLabel="name"
        placeholder="Select A Language"
        className="w-full md:w-14rem py-1"
        itemTemplate={countryOptionTemplate}
        valueTemplate={selectedCountryTemplate}
      />
    </div>
  );
}

export default LanguageSwitcher;
