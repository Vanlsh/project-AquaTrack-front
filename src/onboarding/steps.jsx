import React from 'react';
import { useTranslation } from 'react-i18next';
import { TourProvider } from '@reactour/tour';
import { disableBody, enableBody, styles } from './onboardingStyles';

const TourSteps = ({ children }) => {
  const { t } = useTranslation();

  const steps = [
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2>{t("greatingH")}</h2>
          <p>{t("greatingP")}</p>
        </div>
      ),
      position: 'center'
    },
    {
      selector: '.first-step',
      content: t('first-step'),
    },
    {
      selector: '.second-step',
      content: t('second-step'),
    },
    {
      selector: '.third-step',
      content: t('third-step'),
    },
    {
      selector: '.four-step',
      content: t('fourth-step'),
    },
    {
      selector: '.five-step',
      content: t('fifth-step'),
    },
    {
      selector: '.six-step',
      content: t('sixth-step'),
    },
    {
      content: (
        <div style={{ textAlign: 'center' }}>
          <h2>{t("endingH")}</h2>
        </div>
      ),
      position: 'center'
    }
  ];


  return (
    <TourProvider
      steps={steps}
      afterOpen={disableBody}
      beforeClose={enableBody}
      styles={styles}
      badgeContent={({ totalSteps, currentStep }) => `${currentStep + 1}/${totalSteps}`}
    >
      {children}
    </TourProvider>
  );
};

export default TourSteps;
