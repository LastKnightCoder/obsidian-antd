import * as React from "react";
import styles from './index.module.css';

const classNames = require('classnames');

export interface INavCardProps {
  title: string;
  desc: string;
}

const NavCard = (props: INavCardProps) => {
  return (
    <a href={`${props.title}.md`} data-nav-card className={classNames('internal-link', styles.navCard)}>
      <div className={styles.title}>📄️{props.title}</div>
      <div className={styles.desc}>{props.desc}</div>
    </a>
  )
}

export default NavCard;
