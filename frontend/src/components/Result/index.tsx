import { Icon } from '@iconify/react';
import React from 'react';
import Row from '../atoms/Row';
import Centered from '../Centered';
import styles from './Result.module.scss';

type ResultProps = {
  status: '500' | 'info';
  title: string;
  subTitle?: string;
  icon?: React.ReactElement;
  extra?: React.ReactElement;
};

const Result: React.FC<ResultProps> = ({
  status = 'info',
  title,
  subTitle,
  icon = <Icon icon="bx:bx-bulb" />,
  extra,
}) => {
  if (status === '500') {
    subTitle = 'Pahoittelut, jokin meni pieleen.';
    icon = <Icon icon="bx:bx-error" />;
  }

  return (
    <Centered className={styles.result}>
      <Row alignItems="center">
        {React.cloneElement(icon, { style: { width: '84px', height: '84px' } })}
      </Row>
      <Row className={styles.title}>{title}</Row>
      {subTitle && (
        <Row className={styles.subtitle}>
          <div>{subTitle}</div>
        </Row>
      )}
      {extra && <Row className={styles.extra}>{extra}</Row>}
    </Centered>
  );
};

export default Result;
