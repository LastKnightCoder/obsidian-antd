import * as React from "react";
import NavCard from "components/NavCard";
import styles from './index.module.css';
import type { INavCardProps } from "components/NavCard";

interface INavListProps {
  data: INavCardProps[];
}

const NavList = (props: INavListProps) => {
  return (
    <div data-nav-list className={styles.navList}>
      {props.data.map((item) => <NavCard {...item} key={item.title} />)}
    </div>
  )
}

export default NavList;
